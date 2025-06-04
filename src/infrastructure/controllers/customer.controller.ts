import { CustomerRequestDto } from '@application/person/dtos/requests/customer.request';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users/customers')
export class CustomerController {
  constructor(private readonly createUseCase: CreateCustomerUsecase) {}

  @ApiOperation({ summary: 'Register a new customer' })
  @ApiBody({ type: CustomerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The customer was registered successfully.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A customer with the same email and/or mobileNumber already exists.',
  })
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe())
    customerRequest: CustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return await this.createUseCase.execute(customerRequest);
  }
}
