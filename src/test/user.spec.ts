import { LoginRequestDto } from '@user/application/dtos/requests/login.request.dto';
import { UserRequestDto } from '@user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@user/application/dtos/responses/user.response.dto';
import { UserTransformer } from '@user/application/transformers/user.transformer';
import { CreateUserUsecase } from '@user/application/usecases/create.usecase';
import { DeleteUserAccountUseCase } from '@user/application/usecases/delete-user-account.usecase';
import { ForgotPasswordUseCase } from '@user/application/usecases/forgot-password.usecase';
import { GetUserInfoUsecase } from '@user/application/usecases/get-user-info.usecase';
import { LoginUsecase } from '@user/application/usecases/login.usecase';
import { ResetPasswordUseCase } from '@user/application/usecases/reset-password.usecase';
import { UpdateAvatarUsecase } from '@user/application/usecases/update-avatar.usecase';

import { NotifierService } from '@notification/application/services/notifier.service';
import { User } from '@user/domain/entities/user';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { AuthController } from '@user/infrastructure/controllers/auth.controller';
import { UserController } from '@user/infrastructure/controllers/user.controller';
import { MockUsersReporitory } from '@user/infrastructure/mock-repositories/user.mock.repository';
import { BcryptHashingProvider } from '@user/infrastructure/providers/bcrypt.hashing.provider';
import { TokenGenerator } from '@user/infrastructure/providers/token-generator.provider';
import jwtConfig from '@config/jwt.config';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('UserController', () => {
  let userController: UserController, request: UserRequestDto, authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [jwtConfig],
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.get('jwt.secret'),
              signOptions: configService.get('jwt.signOptions'),
            };
          },
        }),
      ],
      controllers: [UserController, AuthController],
      providers: [
        DeleteUserAccountUseCase,
        CreateUserUsecase,
        GetUserInfoUsecase,
        {
          provide: UpdateAvatarUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
        ForgotPasswordUseCase,
        LoginUsecase,
        ResetPasswordUseCase,
        UserTransformer,
        { provide: USERS_REPOSITORY, useClass: MockUsersReporitory },
        { provide: 'HashingProvider', useClass: BcryptHashingProvider },
        { provide: 'TokenGenerator', useClass: TokenGenerator },
        {
          provide: 'PasswordResetTokenRepository',
          useValue: {
            create: jest.fn(),
            findByTokenHash: jest.fn(),
            deleteById: jest.fn(),
          },
        },
        {
          provide: 'IEmailSender',
          useValue: {
            sendResetEmail: jest.fn(),
          },
        },
        {
          provide: NotifierService,
          useValue: {
            notify: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    authController = app.get<AuthController>(AuthController);

    request = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('4/3/2005'),
      role: UserRole.CLIENT,
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
      client.firstname = 'John';
      client.lastname = 'Doe';
      client.birthdate = new Date('4/3/2005');
      client.email = 'user1@email.com';
      client.mobileNumber = '00000';
      client.password = 'p@ssword';
      client.createdAt = new Date();
      client.language = 'French';
      client.role = UserRole.CLIENT;

      const response = await userController.create(request);
      const expectedResponse = UserResponseDto.createFromEntity(client);

      expect(errors).toHaveLength(0);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt: _c, id: _i, ...expectedProps } = expectedResponse;
      expect(response).toEqual(expect.objectContaining(expectedProps));
      expect(response.id).toEqual(expect.any(String));
      expect(response.createdAt).toEqual(expect.any(Date));
    });

    it('Should create a salon user peacefully', async () => {
      request.email = 'user2@email.com';
      request.role = UserRole.CLIENT;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      const salonUser = new User();
      salonUser.firstname = 'John';
      salonUser.lastname = 'Doe';
      salonUser.birthdate = new Date('4/3/2005');
      salonUser.email = 'user2@email.com';
      salonUser.mobileNumber = '00000';
      salonUser.password = 'p@ssword';
      salonUser.createdAt = new Date();
      salonUser.language = 'French';
      salonUser.role = UserRole.CLIENT;

      const response = await userController.create(request);
      const expectedResponse = UserResponseDto.createFromEntity(salonUser);

      expect(errors).toHaveLength(0);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt: _c, id: _i, ...expectedProps } = expectedResponse;
      expect(response).toEqual(expect.objectContaining(expectedProps));
      expect(response.id).toEqual(expect.any(String));
      expect(response.createdAt).toEqual(expect.any(Date));
    });

    it('Should fail for invalid email (duplicated email)', async () => {
      await expect(userController.create(request)).rejects.toEqual(
        new ConflictException('A user with the same email and/or mobileNumber already exists.'),
      );
    });
  });

  describe('Login a new user', () => {
    it('Should login user peacefully', async () => {
      const loginRequest = { email: request.email, password: request.password };
      const dto = plainToInstance(LoginRequestDto, loginRequest);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);

      const response = await authController.login(loginRequest);

      expect(response).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('Should respond with bad request for missing email', async () => {
      const loginRequest = { email: null, password: request.password };
      const dto = plainToInstance(LoginRequestDto, loginRequest);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      const firstError = errors[0]!;
      const constraints = firstError.constraints!;
      expect(firstError.property).toEqual('email');
      expect(Object.keys(constraints)).toHaveLength(2);
      expect(firstError.constraints).toHaveProperty('isNotEmpty');
      expect(firstError.constraints).toHaveProperty('isEmail');
    });

    it('Should respond with bad request for invalid email', async () => {
      const loginRequest = { email: 'email', password: request.password };
      const dto = plainToInstance(LoginRequestDto, loginRequest);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      const firstError = errors[0]!;
      const constraints = firstError.constraints!;
      expect(Object.keys(constraints)).toHaveLength(1);
      expect(firstError.constraints).toHaveProperty('isEmail');
    });

    it('Should respond with bad request for missing password', async () => {
      const loginRequest = { email: request.email, password: null };
      const dto = plainToInstance(LoginRequestDto, loginRequest);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      const firstError = errors[0]!;
      const constraints = firstError.constraints!;
      expect(firstError.property).toEqual('password');
      expect(Object.keys(constraints)).toHaveLength(2);
      expect(firstError.constraints).toHaveProperty('isNotEmpty');
      expect(firstError.constraints).toHaveProperty('isString');
    });

    it('Should respond with bad request for unstored email', async () => {
      const loginRequest = { email: 'example@email.com', password: request.password };
      const dto = plainToInstance(LoginRequestDto, loginRequest);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);

      await expect(authController.login(loginRequest)).rejects.toEqual(
        new BadRequestException("A user with this email address doesn't exist."),
      );
    });

    it('Should respond with unauthorized for unstored wrong password', async () => {
      const loginRequest = { email: request.email, password: 'hello_world!' };
      const dto = plainToInstance(LoginRequestDto, loginRequest);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);

      await expect(authController.login(loginRequest)).rejects.toEqual(
        new UnauthorizedException('Invalid credentials.'),
      );
    });
  });
});
