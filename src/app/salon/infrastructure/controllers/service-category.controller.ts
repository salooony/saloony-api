import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@user';
import { CreateServiceCategoryUseCase } from '@salon/application/create-service-category.usecase';
import { CreateServiceCategoryDto } from '@salon/infrastructure/dtos/create-service-category.dto';
import { ServiceCategoryResponseDto } from '@salon/infrastructure/dtos/service-category.response.dto';

/** Admin-only endpoints for managing service categories. */
@ApiTags('Service Categories')
@Controller('service-category')
export class ServiceCategoryController {
  constructor(private readonly createCategory: CreateServiceCategoryUseCase) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service category.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created successfully.',
    type: ServiceCategoryResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'One or more properties are invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'A category with this name already exists.' })
  async create(@Body() dto: CreateServiceCategoryDto): Promise<ServiceCategoryResponseDto> {
    return await this.createCategory.execute(dto);
  }
}
