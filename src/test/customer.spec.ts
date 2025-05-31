import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerTransformer } from '@application/person/transformers/customer.transformer';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { CustomerController } from '@infrastructure/controllers/customer.controller';
import { CustomerRepository } from '@infrastructure/repositories/customer.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CreateCustomerUsecase,
        { provide: 'CustomerRepository', useClass: CustomerRepository },
        CustomerTransformer,
      ],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('Registration', () => {
    const request = {
      firstname: 'John',
      lastname: 'Doe',
      date: '4/3/2005',
      email: 'example@email.com',
      mobileNumber: '00000',
      password: 'p@ssword',
      location: 'location',
    };

    /* const customer = {
      firstname: 'John',
      lastname: 'Doe',
      date: '4/3/2005',
      email: 'example@email.com',
      mobileNumber: '00000',
      location: new Location(),
      imageURL: '',
      password: 'p@ssword',
    }; */
    const customer = new Customer();
    customer.firstname = 'John';
    customer.lastname = 'Doe';
    // customer.date= '4/3/2005',
    customer.email = 'example@email.com';
    customer.mobileNumber = '00000';
    customer.location = new Location();
    customer.imageURL = '';
    customer.password = 'p@ssword';
    it('Should create a customer peacefully', async () => {
      expect(
        await customerController.create(
          new CustomerRequestDto(
            'John',
            'Doe',
            '4/3/2005',
            'example@email.com',
            '00000',
            'p@ssword',
            'location',
          ),
        ),
      ).toEqual(customer);
    });
  });
});
