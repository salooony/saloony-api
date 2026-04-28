// Domain exports
export * from './domain/entities/salon';
export * from './domain/entities/service';
export * from './domain/entities/service-category';
export * from './domain/enums/salon-role.enum';
export { ISalonRepository, SALON_REPOSITORY } from './domain/ports/isalon.repository';
export { IServiceRepository, SERVICE_REPOSITORY } from './domain/ports/iservice.repository';

// Infrastructure exports
export { SalonModule } from './infrastructure/modules/salon.module';
export { SalonMapper } from './infrastructure/mappers/salon.mapper';
export { ServiceMapper } from './infrastructure/mappers/service.mapper';
export { ServiceCategoryMapper } from './infrastructure/mappers/service-category.mapper';
export { SalonController } from './infrastructure/controllers/salon.controller';
export { ServiceController } from './infrastructure/controllers/service.controller';
export { SalonRepository } from './infrastructure/providers/salon.repository';
export { ServiceRepository } from './infrastructure/providers/service.repository';
export { Salon as SalonSchema } from './infrastructure/schemas/salon.entity';
export { Service as ServiceSchema } from './infrastructure/schemas/service.entity';
export { ServiceCategoryEntity as ServiceCategorySchema } from './infrastructure/schemas/service-category.entity';
export { SalonServiceEntity as SalonServiceSchema } from './infrastructure/schemas/salon-service.entity';
