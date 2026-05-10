// Domain exports
export * from './domain/entities/salon';
export * from './domain/entities/service';
export * from './domain/entities/service-category';
export { ISalonRepository, SALON_REPOSITORY } from './domain/ports/isalon.repository';
export { IServiceCategoryRepository, SERVICE_CATEGORY_REPOSITORY } from './domain/ports/iservice-category.repository';

// Infrastructure exports
export { SalonModule } from './infrastructure/modules/salon.module';
export { SalonMapper } from './infrastructure/mappers/salon.mapper';
export { ServiceMapper } from './infrastructure/mappers/service.mapper';
export { ServiceCategoryMapper } from './infrastructure/mappers/service-category.mapper';
export { SalonController } from './infrastructure/controllers/salon.controller';
export { ServiceController } from './infrastructure/controllers/service.controller';
export { ServiceCategoryController } from './infrastructure/controllers/service-category.controller';
export { SalonRepository } from './infrastructure/providers/salon.repository';
export { ServiceCategoryRepository } from './infrastructure/providers/service-category.repository';
export { ServiceCategoryResponseDto } from './infrastructure/dtos/service-category.response.dto';
export { Salon as SalonSchema } from './infrastructure/schemas/salon.entity';
export { Service as ServiceSchema } from './infrastructure/schemas/service.entity';
export { ServiceCategory as ServiceCategorySchema } from './infrastructure/schemas/service-category.entity';
