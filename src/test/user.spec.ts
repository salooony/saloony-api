import { UserRequestDto } from '@app/user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@app/user/application/dtos/responses/user.response.dto';
import { UserTransformer } from '@app/user/application/transformers/user.transformer';
import { CreateUserUsecase } from '@app/user/application/usecases/create.usecase';
import { User } from '@app/user/domain/entities/user';
import { Roles } from '@app/user/domain/enums/roles.enum';
import { UserController } from '@app/user/infrastructure/controllers/user.controller';
import { MockUsersReporitory } from '@app/user/infrastructure/mock-repositories/user.mock.repository';
import { BcryptHashingProvider } from '@app/user/infrastructure/providers/bcrypt.hashing.provider';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

describe('UserController', () => {
  let userController: UserController, request: UserRequestDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserUsecase,
        UserTransformer,
        { provide: 'UsersRepository', useClass: MockUsersReporitory },
        { provide: 'HashingProvider', useClass: BcryptHashingProvider },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);

    request = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('4/3/2005'),
      role: Roles.CLIENT,
      email: 'user1@email.com',
      mobileNumber: '00000',
      password: 'P@ssw0rd',
      language: 'French',
    };
  });

  describe('Registration a new user', () => {
    it('Should create a customer peacefully', async () => {
      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      const client = new User();
      client.id = 1;
      client.firstname = 'John';
      client.lastname = 'Doe';
      client.birthdate = new Date('4/3/2005');
      client.email = 'user1@email.com';
      client.mobileNumber = '00000';
      client.password = 'p@ssword';
      client.createdAt = new Date();
      client.language = 'French';
      client.role = Roles.CLIENT;

      const response = await userController.create(request);
      const expectedResponse = UserResponseDto.createFromEntity(client);

      expect(errors).toHaveLength(0);

      expect(response).toEqual({
        ...expectedResponse,
        createdAt: expect.any(Date),
      });

      expect(response.createdAt.toISOString().slice(0, 19)).toEqual(
        expectedResponse.createdAt.toISOString().slice(0, 19),
      );
    });

    it('Should create a saloon user peacefully', async () => {
      request.email = 'user2@email.com';
      request.role = Roles.SALOON_USER;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      const saloonUser = new User();
      saloonUser.id = 2;
      saloonUser.firstname = 'John';
      saloonUser.lastname = 'Doe';
      saloonUser.birthdate = new Date('4/3/2005');
      saloonUser.email = 'user2@email.com';
      saloonUser.mobileNumber = '00000';
      saloonUser.password = 'p@ssword';
      saloonUser.createdAt = new Date();
      saloonUser.language = 'French';
      saloonUser.role = Roles.SALOON_USER;

      const response = await userController.create(request);
      const expectedResponse = UserResponseDto.createFromEntity(saloonUser);

      expect(errors).toHaveLength(0);

      expect(response).toEqual({
        ...expectedResponse,
        createdAt: expect.any(Date),
      });

      expect(response.createdAt.toISOString().slice(0, 19)).toEqual(
        expectedResponse.createdAt.toISOString().slice(0, 19),
      );
    });

    it('Should fail for missing firstname', async () => {
      request.firstname = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('firstname');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for missing lastname', async () => {
      request.lastname = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('lastname');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for missing birthdate', async () => {
      request.birthdate = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('birthdate');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isDate');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for missing role', async () => {
      request.role = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('role');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isEnum');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for invalid client role', async () => {
      const dto = plainToInstance(UserRequestDto, { ...request, role: 'client' });
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('role');
      expect(errors[0].constraints).toHaveProperty('isEnum');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it('Should fail for invalid saloon user role', async () => {
      const dto = plainToInstance(UserRequestDto, { ...request, role: 'saloon user' });
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('role');
      expect(errors[0].constraints).toHaveProperty('isEnum');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it('Should fail for missing email', async () => {
      request.email = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('email');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isEmail');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for invalid email (type error)', async () => {
      request.email = 'example.email';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('email');
      expect(errors[0].constraints).toHaveProperty('isEmail');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it('Should fail for invalid email (duplicated email)', () => {
      expect(() => userController.create(request)).rejects.toEqual(
        new ConflictException('A user with the same email and/or mobileNumber already exists.'),
      );
    });

    it('Should fail for missing mobile number', async () => {
      request.mobileNumber = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('mobileNumber');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isMobilePhone');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for invalid mobile number', async () => {
      request.mobileNumber = '0000';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('mobileNumber');
      expect(errors[0].constraints).toHaveProperty('isMobilePhone');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it('Should fail for missing password', async () => {
      request.password = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });

    it('Should fail for invalid password (too short)', async () => {
      request.password = 'Pa0!';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it("Should fail for invalid password (doesn't contain a symbol)", async () => {
      request.password = 'Pass0';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it("Should fail for invalid password (doesn't contain a number)", async () => {
      request.password = 'Pass!';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it("Should fail for invalid password (doesn't contain an uppercase charachter)", async () => {
      request.password = 'passw0rd!';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it("Should fail for invalid password (doesn't contain a lowercase character)", async () => {
      request.password = 'PASSW0RD!';

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });

    it('Should fail for missing language', async () => {
      request.language = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('language');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(Object.keys(errors[0].constraints)).toHaveLength(2);
    });
  });
});
