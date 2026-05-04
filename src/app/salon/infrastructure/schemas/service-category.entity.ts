import { CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/** Persistence schema for the dynamic service_categories lookup table. */
@Entity({ name: 'service_categories' })
export class ServiceCategory {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
