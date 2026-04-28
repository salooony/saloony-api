import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Salon } from './salon.entity';
import { Service } from './service.entity';

/**
 * Pivot entity representing the many-to-many relationship between Salons and Services,
 * containing salon-specific metadata like pricing.
 */
@Entity({ name: 'salon_services' })
export class SalonServiceEntity {
  @PrimaryColumn({ type: 'uuid', name: 'salon_id' })
  salonId: string;

  @PrimaryColumn({ type: 'uuid', name: 'service_id' })
  serviceId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @ManyToOne(() => Salon, (salon) => salon.salonServices)
  @JoinColumn({ name: 'salon_id' })
  salon: Salon;

  @ManyToOne(() => Service, (service) => service.salonServices)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
