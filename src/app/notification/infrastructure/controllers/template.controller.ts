import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create a new notification template' })
  @ApiResponse({ status: 201, description: 'Template created successfully', type: Template })
  @ApiResponse({ status: 409, description: 'Template with key and type already exists' })
  async create(@Body() dto: CreateTemplateRequestDto): Promise<Template> {
    return await this.createTemplateUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification templates' })
  @ApiResponse({ status: 200, description: 'All templates retrieved successfully', type: [Template] })
  async findAll(): Promise<Template[]> {
    return await this.getAllTemplatesUseCase.execute();
  }

  @Get(':type/:key')
  @ApiOperation({ summary: 'Get a notification template by type and key' })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully', type: Template })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async findOne(@Param('type') type: NotificationType, @Param('key') key: string): Promise<Template> {
    return await this.getTemplateByKeyUseCase.execute(key, type);
  }

  @Put(':type/:key')
  @ApiOperation({ summary: 'Update a notification template' })
  @ApiResponse({ status: 200, description: 'Template updated successfully', type: Template })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async update(
    @Param('type') type: NotificationType,
    @Param('key') key: string,
    @Body() dto: UpdateTemplateRequestDto,
  ): Promise<Template> {
    return await this.updateTemplateUseCase.execute(key, type, dto);
  }

  @Delete(':type/:key')
  @ApiOperation({ summary: 'Delete a notification template' })
  @ApiResponse({ status: 204, description: 'Template deleted successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async delete(@Param('type') type: NotificationType, @Param('key') key: string): Promise<void> {
    await this.deleteTemplateUseCase.execute(key, type);
  }
}
