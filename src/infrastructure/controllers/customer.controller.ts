import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { Controller, Header, Post } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor(private readonly createUseCase: CreateCustomerUsecase) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    customerRequest: CustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return await this.createUseCase.execute(customerRequest);
  }
}
