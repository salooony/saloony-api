import { Public } from '@user/application/decorators/public.decorator';
import { Body, Controller, Get, Header, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/shared/decorators/roles.decorator';
import { UserRole } from '@app/user/domain/enums/user-role.enum';
import { CreateCountryRequestDto } from '@address/application/dtos/requests/create-country.request.dto';
import { ListCountriesRequestDto } from '@address/application/dtos/requests/list-countries.request.dto';
import { CountryResponseDto } from '@address/application/dtos/responses/country.response.dto';
import { CreateCountryUsecase } from '@address/application/usecases/create-country.usecase';
import { ListCountriesUsecase } from '@address/application/usecases/list-countries.usecase';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(
    private readonly createCountryUsecase: CreateCountryUsecase,
    private readonly listCountriesUsecase: ListCountriesUsecase,
  ) {}

  @ApiOperation({ summary: 'List countries (PUBLIC)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Countries were retrieved successfully.',
    type: CountryResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more query parameters is invalid.',
  })
  @Public()
  @Get()
  async list(
    @Query(new ValidationPipe({ transform: true })) query: ListCountriesRequestDto,
  ): Promise<CountryResponseDto[]> {
    return await this.listCountriesUsecase.execute(query);
  }

  @ApiOperation({ summary: 'Create a new country (ADMIN only)' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCountryRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The country was created successfully.',
    type: CountryResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more of the submitted properties was not entered properly.',
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
}
