import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { COUNTRY_CODE_LENGTH } from '@address/domain/constants/country-code.constants';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: COUNTRY_CODE_LENGTH, unique: true, nullable: false })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  icon: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;
}
