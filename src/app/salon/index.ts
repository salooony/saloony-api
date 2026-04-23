// Domain exports
export * from './domain/entities/salon';
export * from './domain/entities/service';
export * from './domain/enums/salon-role.enum';
export * from './domain/enums/service-category.enum';
export { ISalonRepository, SALON_REPOSITORY } from './domain/ports/isalon.repository';

// Infrastructure exports
export { SalonModule } from './infrastructure/modules/salon.module';
export { SalonMapper } from './infrastructure/mappers/salon.mapper';
export { ServiceMapper } from './infrastructure/mappers/service.mapper';
export { SalonController } from './infrastructure/controllers/salon.controller';
export { ServiceController } from './infrastructure/controllers/service.controller';
export { SalonRepository } from './infrastructure/providers/salon.repository';
export { Salon as SalonSchema } from './infrastructure/schemas/salon.entity';
export { ServiceEntity as ServiceSchema } from './infrastructure/schemas/service.entity';
