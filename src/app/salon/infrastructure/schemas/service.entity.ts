import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceCategory } from './service-category.entity';

/** Persistence schema for an independent, bookable service offered across multiple salons. */
@Entity({ name: 'services' })
export class Service {
  @PrimaryColumn({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 100, name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => ServiceCategory, { nullable: false })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'name' })
  category: ServiceCategory;

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
}
