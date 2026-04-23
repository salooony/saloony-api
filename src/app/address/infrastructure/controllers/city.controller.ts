import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { CreateCityUsecase } from '@address/application/usecases/create-city.usecase';
import { CreateCityRequestDto } from '@address/application/dtos/requests/create-city.request.dto';
import { CityResponseDto } from '@address/application/dtos/responses/city.response.dto';

@ApiTags('Cities')
@ApiBearerAuth()
@Controller('cities')
export class CityController {
  constructor(private readonly createCityUsecase: CreateCityUsecase) {}

  @ApiOperation({ summary: 'Create city (ADMIN only)' })
  @ApiBody({ type: CreateCityRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CityResponseDto,
    description: 'City was added successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more of the submitted properties is invalid.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Requires ADMIN role.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Country not found.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'City already exists',
  })
  @Roles(UserRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe())
    request: CreateCityRequestDto,
  ): Promise<CityResponseDto> {
    const city = await this.createCityUsecase.execute(request);
    return CityResponseDto.createFromEntity(city);
  }
}
