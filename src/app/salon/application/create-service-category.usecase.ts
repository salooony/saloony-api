import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ServiceCategory } from '@salon/domain/entities/service-category';
import {
  IServiceCategoryRepository,
  SERVICE_CATEGORY_REPOSITORY,
} from '@salon/domain/ports/iservice-category.repository';
import { CreateServiceCategoryDto } from '@salon/infrastructure/dtos/create-service-category.dto';
import { ServiceCategoryResponseDto } from '@salon/infrastructure/dtos/service-category.response.dto';

/** Orchestrates creation of a new service category. */
@Injectable()
export class CreateServiceCategoryUseCase {
  constructor(
    @Inject(SERVICE_CATEGORY_REPOSITORY)
    private readonly repo: IServiceCategoryRepository,
  ) {}

  async execute(dto: CreateServiceCategoryDto): Promise<ServiceCategoryResponseDto> {
    const name = dto.name.trim();

    const category = new ServiceCategory();
    category.name = name;
    category.isActive = true;
    category.activatedAt = new Date();
    category.deactivatedAt = null;

    try {
      return ServiceCategoryResponseDto.createFromEntity(await this.repo.create(category));
    } catch (error: unknown) {
      if ((error as { code?: string }).code === '23505') {
        throw new ConflictException(`Service category "${name}" already exists.`);
      }
      throw error;
    }
  }
}
