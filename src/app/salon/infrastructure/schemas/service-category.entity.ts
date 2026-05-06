import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/** Persistence schema for the dynamic service_categories lookup table. */
@Entity({ name: 'service_categories' })
export class ServiceCategory {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', name: 'activated_at', nullable: true, default: () => 'now()' })
  activatedAt: Date | null;

  @Column({ type: 'timestamp', name: 'deactivated_at', nullable: true, default: null })
  deactivatedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;
}
