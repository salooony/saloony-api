// Domain exports
export * from './domain/entities/salon';
export * from './domain/enums/salon-role.enum';
export { ISalonRepository, SALON_REPOSITORY } from './domain/ports/isalon.repository';

// Infrastructure exports
export { SalonModule } from './infrastructure/modules/salon.module';
export { SalonMapper } from './infrastructure/mappers/salon.mapper';
export { SalonController } from './infrastructure/controllers/salon.controller';
export { SalonRepository } from './infrastructure/providers/salon.repository';
export { Salon as SalonSchema } from './infrastructure/schemas/salon.entity';
