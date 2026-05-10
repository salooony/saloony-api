import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { AuthorizationGuard } from '@shared/guards/authorization.guard';
import { CreateServiceCategoryUseCase } from '@salon/application/create-service-category.usecase';
import { CreateServiceCategoryDto } from '@salon/infrastructure/dtos/create-service-category.dto';
import { ServiceCategoryResponseDto } from '@salon/infrastructure/dtos/service-category.response.dto';

/** Admin-only endpoints for managing service categories. */
@ApiTags('Service Categories')
@ApiBearerAuth()
@Controller('service-category')
@UseGuards(AuthorizationGuard)
@Roles(UserRole.ADMIN)
export class ServiceCategoryController {
  constructor(private readonly createCategory: CreateServiceCategoryUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service category (Admin only).' })
  @ApiBody({ type: CreateServiceCategoryDto })
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
