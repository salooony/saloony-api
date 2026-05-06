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

  @Column({ type: 'varchar', length: 1000, nullable: false })
  description: string;

  /** Stores only the category name; load the full relation only when explicitly needed. */
  @Column({ type: 'varchar', length: 100, name: 'category' })
  category: string;

  @ManyToOne(() => ServiceCategory, { nullable: false })
  @JoinColumn({ name: 'category', referencedColumnName: 'name' })
  categoryRelation: ServiceCategory;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'timestamp', name: 'activated_at', default: () => 'now()' })
  activatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
