import { Salon } from '../../domain/entities/salon';
import { Salon as SalonEntity } from '../schemas/salon.entity';

export class SalonMapper {
  static map(salonEntity: SalonEntity): Salon {
    const salon = new Salon();

    salon.id = salonEntity.id;
    salon.name = salonEntity.name;
    salon.description = salonEntity.description;
    salon.createdAt = salonEntity.createdAt;
    salon.updatedAt = salonEntity.updatedAt;

    return salon;
  }
}
