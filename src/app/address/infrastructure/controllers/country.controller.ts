import { Body, Controller, Header, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/shared/decorators/roles.decorator';
import { UserRole } from '@app/user/domain/enums/user-role.enum';
import { CreateCountryRequestDto } from '@address/application/dtos/requests/create-country.request.dto';
import { UpdateCountryRequestDto } from '@address/application/dtos/requests/update-country.request.dto';
import { CountryResponseDto } from '@address/application/dtos/responses/country.response.dto';
import { CreateCountryUsecase } from '@address/application/usecases/create-country.usecase';
import { UpdateCountryUsecase } from '@address/application/usecases/update-country.usecase';

@ApiTags('Countries')
@ApiBearerAuth()
@Controller('countries')
export class CountryController {
  constructor(
    private readonly createCountryUsecase: CreateCountryUsecase,
    private readonly updateCountryUsecase: UpdateCountryUsecase,
  ) {}

  @ApiOperation({ summary: 'Create a new country (ADMIN only)' })
  @ApiBody({ type: CreateCountryRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The country was created successfully.',
    type: CountryResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more of the submitted properties is invalid.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A country with the same code already exists.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Requires ADMIN role.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @Roles(UserRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) request: CreateCountryRequestDto): Promise<CountryResponseDto> {
    return await this.createCountryUsecase.execute(request);
  }

  @ApiOperation({ summary: 'Update a country (ADMIN only)' })
  @ApiBody({ type: UpdateCountryRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The country was updated successfully.',
    type: CountryResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more of the submitted propertiesis invalid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Country not found.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A country with the same code already exists.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Requires ADMIN role.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) request: UpdateCountryRequestDto,
  ): Promise<CountryResponseDto> {
    return await this.updateCountryUsecase.execute(id, request);
  }
}
