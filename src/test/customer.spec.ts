import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { Location } from '@domain/entities/location.entity';
import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { CustomerController } from '@infrastructure/controllers/customer.controller';
import { MockCustomersReporitory } from '@infrastructure/mock-repositories/customer.mock.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('CustomerController', () => {
  let customerController: CustomerController, request: CustomerRequestDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CreateCustomerUsecase,
        CustomerTransformer,
        { provide: 'CustomersRepository', useClass: MockCustomersReporitory },
      ],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);

    request = {
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date('4/3/2005'),
      email: 'example@email.com',
      mobileNumber: '00000',
      password: 'P@ssw0rd',
      language: 'French',
      location: {
        latitude: 50,
        longitude: 50,
      },
    };
  });

  describe('Registration', () => {
    const customer = new Customer();
    customer.firstname = 'John';
    customer.lastname = 'Doe';
    customer.birthdate = new Date('4/3/2005');
    customer.email = 'example@email.com';
    customer.mobileNumber = '00000';
    customer.location = new Location();
    customer.location.latitude = 50;
    customer.location.longitude = 50;
    customer.imageURL = '';
    customer.password = 'p@ssword';
    customer.calendarURL = '';
    customer.joinDate = new Date();
    customer.language = 'French';

    it('Should create a customer peacefully', async () => {
      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      const response = await customerController.create(request);
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

    it('Should fail for missing firstname', async () => {
      request.firstname = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('firstname');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
    });

    it('Should fail for missing lastname', async () => {
      request.lastname = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('lastname');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
    });

    it('Should fail for missing birthdate', async () => {
      request.birthdate = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('birthdate');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isDate');
      expect(errors[0].constraints).toHaveProperty('isAgeAtLeast');
    });

    it('Should fail for invalid birthdate (user is too young)', async () => {
      const today = new Date();
      request.birthdate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('birthdate');
      expect(errors[0].constraints).toHaveProperty('isAgeAtLeast');
    });

    it('Should fail for missing email', async () => {
      request.email = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('email');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(errors[0].constraints).toHaveProperty('isEmail');
    });

    it('Should fail for invalid email', async () => {
      request.email = 'example.email';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('email');
      expect(errors[0].constraints).toHaveProperty('isEmail');
    });

    it('Should fail for missing mobile number', async () => {
      request.mobileNumber = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('mobileNumber');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(errors[0].constraints).toHaveProperty('isMobilePhone');
    });

    it('Should fail for invalid mobile number', async () => {
      request.mobileNumber = '0000';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('mobileNumber');
      expect(errors[0].constraints).toHaveProperty('isMobilePhone');
    });

    it('Should fail for missing password', async () => {
      request.password = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
    });

    it('Should fail for invalid password (too short)', async () => {
      request.password = 'Pa0!';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
    });

    it("Should fail for invalid password (doesn't contain a symbol)", async () => {
      request.password = 'Pass0';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
    });

    it("Should fail for invalid password (doesn't contain a number)", async () => {
      request.password = 'Pass!';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
    });

    it("Should fail for invalid password (doesn't contain an uppercase charachter)", async () => {
      request.password = 'passw0rd!';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
    });

    it("Should fail for invalid password (doesn't contain a lowercase character)", async () => {
      request.password = 'PASSW0RD!';

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('password');
      expect(errors[0].constraints).toHaveProperty('isStrongPassword');
    });

    it('Should fail for missing language', async () => {
      request.language = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('language');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
    });

    it('Should fail for missing location', async () => {
      request.location = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('Should fail for invalid location (missing latitude)', async () => {
      request.location.latitude = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].children[0].property).toEqual('latitude');
      expect(errors[0].children[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].children[0].constraints).toHaveProperty('isNumber');
      expect(errors[0].children[0].constraints).toHaveProperty('max');
      expect(errors[0].children[0].constraints).toHaveProperty('min');
    });

    it('Should fail for invalid location (latitude is too large)', async () => {
      request.location.latitude = 100;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].children[0].property).toEqual('latitude');
      expect(errors[0].children[0].constraints).toHaveProperty('max');
    });

    it('Should fail for invalid location (latitude is too small)', async () => {
      request.location.latitude = -100;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].children[0].property).toEqual('latitude');
      expect(errors[0].children[0].constraints).toHaveProperty('min');
    });

    it('Should fail for invalid location (missing longitude)', async () => {
      request.location.longitude = null;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].children[0].property).toEqual('longitude');
      expect(errors[0].children[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].children[0].constraints).toHaveProperty('isNumber');
      expect(errors[0].children[0].constraints).toHaveProperty('max');
      expect(errors[0].children[0].constraints).toHaveProperty('min');
    });

    it('Should fail for invalid location (longitude is too large)', async () => {
      request.location.longitude = 200;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].children[0].property).toEqual('longitude');
      expect(errors[0].children[0].constraints).toHaveProperty('max');
    });

    it('Should fail for invalid location (longitude is too small)', async () => {
      request.location.longitude = -200;

      const dto = plainToInstance(CustomerRequestDto, request);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual('location');
      expect(errors[0].children[0].property).toEqual('longitude');
      expect(errors[0].children[0].constraints).toHaveProperty('min');
    });
  });
});
