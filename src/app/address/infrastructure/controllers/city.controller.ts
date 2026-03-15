import {
  Body,
  Controller,
  Header,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@app/shared/decorators/roles.decorator';
import { UserRole } from '@app/user/domain/enums/user-role.enum';

import { CreateCityUsecase } from '@address/application/usecases/create-city.usecase';
import { CreateCityRequestDto } from '@address/application/dtos/requests/create-city.request.dto';
import { CityResponseDto } from '@address/application/dtos/responses/city.response.dto';

@ApiTags('Cities')
@ApiBearerAuth()
@Controller('cities')
export class CityController {
  constructor(
    private readonly createCityUsecase: CreateCityUsecase,
  ) {}

  @ApiOperation({ summary: 'Create city (ADMIN only)' })
  @ApiBody({ type: CreateCityRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CityResponseDto,
  })
  @Roles(UserRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe())
    request: CreateCityRequestDto,
  ): Promise<CityResponseDto> {
    return this.createCityUsecase.execute(request);
  }
}