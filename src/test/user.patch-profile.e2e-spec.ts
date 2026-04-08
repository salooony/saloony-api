import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';

describe('PATCH /users/me (e2e)', () => {
  let app: INestApplication;
  let httpServer: Parameters<typeof request>[0];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await (app as NestFastifyApplication).getHttpAdapter().getInstance().ready();
    httpServer = app.getHttpServer() as Parameters<typeof request>[0];
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 401 when request is unauthenticated', async () => {
    await request(httpServer).patch('/users/me').send({ firstname: 'Unauthenticated' }).expect(401);
  });

  it('returns 200 for valid partial update and persists values', async () => {
    const suffix = `${Date.now()}-patch-1`;
    const password = 'P@ssw0rd1';

    const user = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('2000-01-01'),
      role: 'client',
      email: `patch1-${suffix}@email.com`,
      mobileNumber: '+21655555111',
      password,
      language: 'French',
    };

    await request(httpServer).post('/users').send(user).expect(201);

    const login = await request(httpServer).post('/auth/login').send({ email: user.email, password }).expect(201);

    const accessToken = (login.body as { accessToken: string }).accessToken;

    const patchResponse = await request(httpServer)
      .patch('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ firstname: 'Jane', language: 'English', emailReminders: false, smsReminders: true })
      .expect(200);

    expect((patchResponse.body as { firstname: string }).firstname).toBe('Jane');
    expect((patchResponse.body as { language: string }).language).toBe('English');
    expect((patchResponse.body as { emailReminders: boolean }).emailReminders).toBe(false);
    expect((patchResponse.body as { smsReminders: boolean }).smsReminders).toBe(true);

    const currentUser = await request(httpServer)
      .get('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect((currentUser.body as { firstname: string }).firstname).toBe('Jane');
    expect((currentUser.body as { language: string }).language).toBe('English');
    expect((currentUser.body as { emailReminders: boolean }).emailReminders).toBe(false);
    expect((currentUser.body as { smsReminders: boolean }).smsReminders).toBe(true);
  });

  it('returns 422 for empty patch request', async () => {
    const suffix = `${Date.now()}-patch-2`;
    const password = 'P@ssw0rd1';

    const user = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('2000-01-01'),
      role: 'client',
      email: `patch2-${suffix}@email.com`,
      mobileNumber: '+21655555222',
      password,
      language: 'French',
    };

    await request(httpServer).post('/users').send(user).expect(201);

    const login = await request(httpServer).post('/auth/login').send({ email: user.email, password }).expect(201);

    const accessToken = (login.body as { accessToken: string }).accessToken;

    await request(httpServer).patch('/users/me').set('Authorization', `Bearer ${accessToken}`).send({}).expect(422);
  });

  it('returns 400 for invalid email format', async () => {
    const suffix = `${Date.now()}-patch-3`;
    const password = 'P@ssw0rd1';

    const user = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('2000-01-01'),
      role: 'client',
      email: `patch3-${suffix}@email.com`,
      mobileNumber: '+21655555333',
      password,
      language: 'French',
    };

    await request(httpServer).post('/users').send(user).expect(201);

    const login = await request(httpServer).post('/auth/login').send({ email: user.email, password }).expect(201);

    const accessToken = (login.body as { accessToken: string }).accessToken;

    await request(httpServer)
      .patch('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ email: 'invalid-email' })
      .expect(400);
  });

  it('returns 409 when updating email to an existing one', async () => {
    const suffix = `${Date.now()}-patch-4`;
    const password = 'P@ssw0rd1';

    const userA = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('2000-01-01'),
      role: 'client',
      email: `patch4a-${suffix}@email.com`,
      mobileNumber: '+21655555444',
      password,
      language: 'French',
    };

    const userB = {
      firstname: 'Alice',
      lastname: 'Smith',
      birthdate: new Date('2000-01-01'),
      role: 'client',
      email: `patch4b-${suffix}@email.com`,
      mobileNumber: '+21655555555',
      password,
      language: 'French',
    };

    await request(httpServer).post('/users').send(userA).expect(201);
    await request(httpServer).post('/users').send(userB).expect(201);

    const login = await request(httpServer).post('/auth/login').send({ email: userA.email, password }).expect(201);

    const accessToken = (login.body as { accessToken: string }).accessToken;

    await request(httpServer)
      .patch('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ email: userB.email })
      .expect(409);
  });
});
