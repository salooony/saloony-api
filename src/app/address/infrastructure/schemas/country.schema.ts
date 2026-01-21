import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'country' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5, unique: true, nullable: false })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  icon: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;
}
