import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { CreateTemplateUseCase } from '@notification/application/usecases/create-template.usecase';
import { GetAllTemplatesUseCase } from '@notification/application/usecases/get-all-templates.usecase';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { UpdateTemplateUseCase } from '@notification/application/usecases/update-template.usecase';
import { DeleteTemplateUseCase } from '@notification/application/usecases/delete-template.usecase';
import { CreateTemplateRequestDto } from '@notification/application/dtos/requests/create-template.request.dto';
import { UpdateTemplateRequestDto } from '@notification/application/dtos/requests/update-template.request.dto';
import { Template } from '@notification/domain/entities/template';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';

@ApiTags('Notification Templates')
@Controller('notifications/templates')
export class TemplateController {
  constructor(
    private readonly createTemplateUseCase: CreateTemplateUseCase,
    private readonly getAllTemplatesUseCase: GetAllTemplatesUseCase,
    private readonly getTemplateByKeyUseCase: GetTemplateByKeyUseCase,
    private readonly updateTemplateUseCase: UpdateTemplateUseCase,
    private readonly deleteTemplateUseCase: DeleteTemplateUseCase,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new notification template' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Template created successfully', type: Template })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Template with key and type already exists' })
  async create(@Body() dto: CreateTemplateRequestDto): Promise<Template> {
    return await this.createTemplateUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification templates' })
  @ApiResponse({ status: HttpStatus.OK, description: 'All templates retrieved successfully', type: [Template] })
  async findAll(): Promise<Template[]> {
    return await this.getAllTemplatesUseCase.execute();
  }

  @Get(':type/:key')
  @ApiOperation({ summary: 'Get a notification template by type and key' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Template retrieved successfully', type: Template })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Template not found' })
  async findOne(@Param('type') type: NotificationType, @Param('key') key: string): Promise<Template> {
    return await this.getTemplateByKeyUseCase.execute(key, type);
  }

  @Put(':type/:key')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a notification template' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Template updated successfully', type: Template })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Template not found' })
  async update(
    @Param('type') type: NotificationType,
    @Param('key') key: string,
    @Body() dto: UpdateTemplateRequestDto,
  ): Promise<Template> {
    return await this.updateTemplateUseCase.execute(key, type, dto);
  }

  @Delete(':type/:key')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a notification template' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Template deleted successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Template not found' })
  async delete(@Param('type') type: NotificationType, @Param('key') key: string): Promise<void> {
    await this.deleteTemplateUseCase.execute(key, type);
  }
}
