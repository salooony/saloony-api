import { UserRequestDto } from '@application/person/dtos/requests/user.request.dto';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response.dto';
import { SaloonUserResponseDto } from '@application/person/dtos/responses/saloon-user.response.dto';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { SaloonUserTransformer } from '@application/person/transformers/saloon-user.transformer';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { CreateSaloonUserUsecase } from '@application/person/user/saloon-user/usecases/create.usecase';
import { Customer } from '@domain/entities/person/users/customer.entity';
import { SaloonUser } from '@domain/entities/person/users/saloon-user.entity';
import { UserController } from '@infrastructure/controllers/user.controller';
import { MockUsersReporitory } from '@infrastructure/mock-repositories/user.mock.repository';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

describe('UserController', () => {
  let userController: UserController, request: UserRequestDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateCustomerUsecase,
        CustomerTransformer,
        CreateSaloonUserUsecase,
        SaloonUserTransformer,
        { provide: 'UsersRepository', useClass: MockUsersReporitory },
        { provide: 'HashingProvider', useClass: BcryptHashingProvider },
      ],
      // imports: [CustomerModule, SaloonUserModule],
    }).compile();

    userController = app.get<UserController>(UserController);

    request = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('4/3/2005'),
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

      const customer = new Customer();
      customer.id = '1';
      customer.firstname = 'John';
      customer.lastname = 'Doe';
      customer.birthdate = new Date('4/3/2005');
      customer.email = 'user1@email.com';
      customer.mobileNumber = '00000';
      customer.imageURL = '';
      customer.password = 'p@ssword';
      customer.joinDate = new Date();
      customer.language = 'French';

      const response = await userController.createCustomer(request);
      const expectedResponse = CustomerResponseDto.createFromEntity(customer);

      expect(errors).toHaveLength(0);

      expect(response).toEqual({
        ...expectedResponse,
        joinDate: expect.any(Date),
      });

      expect(response.joinDate.toISOString().slice(0, 19)).toEqual(
        expectedResponse.joinDate.toISOString().slice(0, 19),
      );
    });

    it('Should create a saloon user peacefully', async () => {
      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      const saloonUser = new SaloonUser();
      saloonUser.id = '1';
      saloonUser.firstname = 'John';
      saloonUser.lastname = 'Doe';
      saloonUser.birthdate = new Date('4/3/2005');
      saloonUser.email = 'user1@email.com';
      saloonUser.mobileNumber = '00000';
      saloonUser.imageURL = '';
      saloonUser.password = 'p@ssword';
      saloonUser.joinDate = new Date();
      saloonUser.language = 'French';
      saloonUser.saloons = [];

      const response = await userController.createSaloonUser(request);
      const expectedResponse = SaloonUserResponseDto.createFromEntity(saloonUser);

      expect(errors).toHaveLength(0);

      expect(response).toEqual({
        ...expectedResponse,
        joinDate: expect.any(Date),
      });

      expect(response.joinDate.toISOString().slice(0, 19)).toEqual(
        expectedResponse.joinDate.toISOString().slice(0, 19),
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
      expect(errors[0].constraints).toHaveProperty('isAgeAtLeast');
      expect(Object.keys(errors[0].constraints)).toHaveLength(3);
    });

    it('Should fail for invalid birthdate (user is too young)', async () => {
      const today = new Date();
      request.birthdate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('birthdate');
      expect(errors[0].constraints).toHaveProperty('isAgeAtLeast');
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
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(errors[0].constraints).toHaveProperty('isEmail');
      expect(Object.keys(errors[0].constraints)).toHaveLength(3);
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
    /*
    it('Should fail for invalid email (duplicated email)', async () => {
      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      const response = await userController.createCustomer(request);

      expect(errors).toHaveLength(0);
      // console.log(response);
      // expect(errors[0]).toBeInstanceOf(ValidationError);
      // expect(errors[0].property).toEqual('email');
      // expect(errors[0].constraints).toHaveProperty('isEmail');
      // expect(Object.keys(errors[0].constraints)).toHaveLength(1);
    });
*/
    it('Should fail for missing mobile number', async () => {
      request.mobileNumber = null;

      const dto = plainToInstance(UserRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
      expect(errors[0].property).toEqual('mobileNumber');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(errors[0].constraints).toHaveProperty('isMobilePhone');
      expect(Object.keys(errors[0].constraints)).toHaveLength(3);
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
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
      expect(Object.keys(errors[0].constraints)).toHaveLength(3);
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
