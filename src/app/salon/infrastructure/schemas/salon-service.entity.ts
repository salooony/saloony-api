import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Salon } from './salon.entity';
import { Service } from './service.entity';

/**
 * Pivot entity representing the many-to-many relationship between Salons and Services.
 */
@Entity({ name: 'salon_services' })
export class SalonServiceEntity {
  @PrimaryColumn({ type: 'uuid', name: 'salon_id' })
  salonId: string;

  @PrimaryColumn({ type: 'uuid', name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => Salon, (salon) => salon.salonServices)
  @JoinColumn({ name: 'salon_id' })
  salon: Salon;

  @ManyToOne(() => Service, (service) => service.salonServices)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
