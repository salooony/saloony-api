import { Controller, Post, Body, Get, Put, Delete, HttpCode, HttpStatus, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@app/user/domain/enums/user-role.enum';
import { CreateTemplateUseCase } from '@notification/application/usecases/create-template.usecase';
import { GetAllTemplatesUseCase } from '@notification/application/usecases/get-all-templates.usecase';
import { GetTemplateByKeyUseCase } from '@notification/application/usecases/get-template-by-key.usecase';
import { UpdateTemplateUseCase } from '@notification/application/usecases/update-template.usecase';
import { DeleteTemplateUseCase } from '@notification/application/usecases/delete-template.usecase';
import { CreateTemplateRequestDto } from '@notification/application/dtos/requests/create-template.request.dto';
import { UpdateTemplateRequestDto } from '@notification/application/dtos/requests/update-template.request.dto';
import { TemplateResponseDto } from '@notification/application/dtos/responses/template.response.dto';
import { TemplateIdentifierDto } from '@notification/application/dtos/requests/template-identifier.dto';

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
  @ApiOperation({ summary: 'Create a new notification template.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Template created successfully.', type: TemplateResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Template with key and type already exists.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'One or more properties are invalid.' })
  async create(@Body() dto: CreateTemplateRequestDto): Promise<TemplateResponseDto> {
    return await this.createTemplateUseCase.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notification templates.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All templates retrieved successfully.',
    type: [TemplateResponseDto],
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only.' })
  async findAll(): Promise<TemplateResponseDto[]> {
    return await this.getAllTemplatesUseCase.execute();
  }

  @Get('details')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a notification template by type and key.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Template retrieved successfully.', type: TemplateResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Template not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'One or more queries are invalid.' })
  async findOne(@Query() query: TemplateIdentifierDto): Promise<TemplateResponseDto> {
    return await this.getTemplateByKeyUseCase.execute(query.key, query.type);
  }

  @Put(':key/:type')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a notification template.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Template updated successfully.', type: TemplateResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Template not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'One or more parameters or properties are invalid.' })
  async update(
    @Param() params: TemplateIdentifierDto,
    @Body() dto: UpdateTemplateRequestDto,
  ): Promise<TemplateResponseDto> {
    return await this.updateTemplateUseCase.execute(params.key, params.type, dto);
  }

  @Delete()
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a notification template.' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Template deleted successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - Admin only.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Template not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'One or more queries are invalid.' })
  async delete(@Query() query: TemplateIdentifierDto): Promise<void> {
    await this.deleteTemplateUseCase.execute(query.key, query.type);
  }
}
