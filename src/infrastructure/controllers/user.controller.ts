import { UserRequestDto } from '@application/person/dtos/requests/user.request.dto';
import { CustomerResponseDto } from '@application/person/dtos/responses/customer.response.dto';
import { SaloonUserResponseDto } from '@application/person/dtos/responses/saloon-user.response.dto';
import { CreateCustomerUsecase } from '@application/person/user/customer/usecases/create.usecase';
import { CreateSaloonUserUsecase } from '@application/person/user/saloon-user/usecases/create.usecase';
import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUsecase,
    private readonly createSaloonUserUseCase: CreateSaloonUserUsecase,
  ) {}

  @ApiOperation({ summary: 'Register a new customer' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The customer was registered successfully.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A user with the same email and/or mobileNumber already exists.',
  })
  @Post('/customers')
  @Header('Content-Type', 'application/json')
  async createCustomer(
    @Body(new ValidationPipe())
    customerRequest: UserRequestDto,
  ): Promise<CustomerResponseDto> {
    return await this.createCustomerUseCase.execute(customerRequest);
  }

  @ApiOperation({ summary: 'Register a new saloon user' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The saloon user was registered successfully.',
    type: SaloonUserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A user with the same email and/or mobileNumber already exists.',
  })
  @Post('/saloon-users')
  @Header('Content-Type', 'application/json')
  async createSaloonUser(
    @Body(new ValidationPipe())
    customerRequest: UserRequestDto,
  ): Promise<SaloonUserResponseDto> {
    return await this.createSaloonUserUseCase.execute(customerRequest);
  }
}
