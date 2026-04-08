import { PatchUserProfileRequestDto } from '@user/application/dtos/requests/patch-user-profile.request.dto';
import { PatchUserProfileUseCase } from '@user/application/usecases/patch-user-profile.usecase';
import { User } from '@user/domain/entities/user';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { MockUsersReporitory } from '@user/infrastructure/mock-repositories/user.mock.repository';
import { ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('PatchUserProfileUseCase', () => {
  let userRepository: MockUsersReporitory;
  let useCase: PatchUserProfileUseCase;

  beforeEach(() => {
    MockUsersReporitory.users = [];
    userRepository = new MockUsersReporitory();
    useCase = new PatchUserProfileUseCase(userRepository);
  });

  it('updates only provided fields and keeps non-provided fields unchanged', async () => {
    const user = await userRepository.save(createUserEntity('user1@email.com', '+21611111111'));

    const request = plainToInstance(PatchUserProfileRequestDto, {
      firstname: 'Jane',
      language: 'English',
      emailReminders: false,
    });

    const response = await useCase.execute(user.id, request);

    expect(response.firstname).toBe('Jane');
    expect(response.language).toBe('English');
    expect(response.lastname).toBe(user.lastname);
    expect(response.email).toBe(user.email);
    expect(response.mobileNumber).toBe(user.mobileNumber);
    expect(response.emailReminders).toBe(false);
    expect(response.smsReminders).toBe(true);
  });

  it('throws unprocessable entity when no updatable field is provided', async () => {
    const user = await userRepository.save(createUserEntity('user2@email.com', '+21622222222'));

    const request = plainToInstance(PatchUserProfileRequestDto, {});

    await expect(useCase.execute(user.id, request)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('throws conflict when updating to an existing email owned by another user', async () => {
    const user1 = await userRepository.save(createUserEntity('user3@email.com', '+21633333333'));
    await userRepository.save(createUserEntity('user4@email.com', '+21644444444'));

    const request = plainToInstance(PatchUserProfileRequestDto, {
      email: 'user4@email.com',
    });

    await expect(useCase.execute(user1.id, request)).rejects.toBeInstanceOf(ConflictException);
  });

  it('validates invalid email format', async () => {
    const request = plainToInstance(PatchUserProfileRequestDto, {
      email: 'not-an-email',
    });

    const errors = await validate(request);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.property).toBe('email');
    expect(errors[0]?.constraints).toHaveProperty('isEmail');
  });

  it('validates invalid mobile number format', async () => {
    const request = plainToInstance(PatchUserProfileRequestDto, {
      mobileNumber: '12-34-56',
    });

    const errors = await validate(request);

    expect(errors).toHaveLength(1);
    expect(errors[0]?.property).toBe('mobileNumber');
    expect(errors[0]?.constraints).toHaveProperty('isMobilePhone');
  });
});

function createUserEntity(email: string, mobileNumber: string): User {
  const user = new User();

  user.firstname = 'John';
  user.lastname = 'Doe';
  user.birthdate = new Date('2000-01-01');
  user.role = UserRole.CLIENT;
  user.email = email;
  user.mobileNumber = mobileNumber;
  user.password = 'P@ssw0rd';
  user.language = 'French';
  user.emailReminders = true;
  user.smsReminders = true;
  user.acl = [];

  return user;
}
