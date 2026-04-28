import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceCategoryEntity } from './service-category.entity';

/** Persistence schema for an independent, bookable service offered across multiple salons. */
@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string | null;

  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => ServiceCategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: ServiceCategoryEntity;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'timestamp', name: 'activated_at', default: () => 'now()' })
  activatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  /** Inverse side of the Salon↔Service relationship. */
  @OneToMany(
    'SalonServiceEntity',
    (salonService: import('./salon-service.entity').SalonServiceEntity) => salonService.service,
  )
  salonServices: import('./salon-service.entity').SalonServiceEntity[];
}
