import { UserRequestDto } from '@app/user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@app/user/application/dtos/responses/user.response.dto';
import { UserTransformer } from '@app/user/application/transformers/user.transformer';
import { CreateUserUsecase } from '@app/user/application/usecases/create.usecase';
import { DeleteUserAccountUseCase } from '@app/user/application/usecases/delete-user-account.usecase';
import { GetUserInfoUsecase } from '@app/user/application/usecases/get-user-info.usecase';
import { UpdateAvatarUsecase } from '@app/user/application/usecases/update-avatar.usecase';
import { NotifierService } from '@app/notification/application/services/notifier.service';
import { FilePathService } from '@app/shared/uploads/application/services/file-path.service';
import { User } from '@app/user/domain/entities/user';
import { UserRole } from '@app/user/domain/enums/user-role.enum';
import { UserController } from '@app/user/infrastructure/controllers/user.controller';
import { MockUsersReporitory } from '@app/user/infrastructure/mock-repositories/user.mock.repository';
import { BcryptHashingProvider } from '@app/user/infrastructure/providers/bcrypt.hashing.provider';
import jwtConfig from '@config/jwt.config';
import { ConflictException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('User Registration', () => {
  let userController: UserController, request: UserRequestDto;

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
      controllers: [UserController],
      providers: [
        DeleteUserAccountUseCase,
        CreateUserUsecase,
        GetUserInfoUsecase,
        UpdateAvatarUsecase,
        UserTransformer,
        FilePathService,
        { provide: 'UsersRepository', useClass: MockUsersReporitory },
        { provide: 'HashingProvider', useClass: BcryptHashingProvider },
        {
          provide: 'IUploadFile',
          useValue: {
            execute: jest.fn(),
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

    request = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('4/3/2005'),
      role: UserRole.CLIENT,
      email: 'user1@email.com',
      mobileNumber: '00000',
      password: 'P@ssw0rd1!',
      language: 'French',
    };

    // Reset the mock repository before each test
    MockUsersReporitory.users = [];
  });

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
    await userController.create(request);
    await expect(userController.create(request)).rejects.toThrow(ConflictException);
  });

  it('Should fail validation for missing firstname', async () => {
    const invalidRequest = { ...request, firstname: '' };
    const dto = plainToInstance(UserRequestDto, invalidRequest);
    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0]!.property).toEqual('firstname');
  });

  it('Should fail validation for invalid email format', async () => {
    const invalidRequest = { ...request, email: 'invalid-email' };
    const dto = plainToInstance(UserRequestDto, invalidRequest);
    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0]!.property).toEqual('email');
  });

  it('Should fail validation for weak password', async () => {
    const invalidRequest = { ...request, password: 'password' };
    const dto = plainToInstance(UserRequestDto, invalidRequest);
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'password')).toBeTruthy();
  });
});
