import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@user/domain/enums/user-role.enum';

import { CreateCityUsecase } from '@address/application/usecases/create-city.usecase';
import { CreateCityRequestDto } from '../../application/dtos/requests/create-city.request.dto';
import { CityResponseDto } from '@address/application/dtos/responses/city.response.dto';

@ApiTags('Cities')
@ApiBearerAuth()
@Controller('cities')
export class CityController {
  constructor(private readonly createCityUsecase: CreateCityUsecase) {}

  @ApiOperation({ summary: 'Create city (ADMIN only).' })
  @ApiBody({ type: CreateCityRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Roles(UserRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe())
    request: CreateCityRequestDto,
  ): Promise<CityResponseDto> {
    return await this.createCityUsecase.execute(request);
  }
}
