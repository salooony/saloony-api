import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5, unique: true })
  code: string;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;
}
