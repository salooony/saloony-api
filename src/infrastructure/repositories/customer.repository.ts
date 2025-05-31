import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { ICustomerRepository } from '@domain/ports/customerRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
// import { Customer as CustomerEntity } from '@infrastructure/schemas/customer.schema';

@Injectable()
export class CustomersRepository implements ICustomerRepository {
  constructor(
    // private readonly dataSource: DataSource,
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    // return await this.dataSource.transaction(
    //   async (manager) => await manager.save(customer),
    // );
    return await this.repository.save(customer);
  }
}
