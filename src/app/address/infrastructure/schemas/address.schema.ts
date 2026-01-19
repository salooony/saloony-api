import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.schema';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  location: {
    lat: number;
    lng: number;
  };

  @Column({ type: 'varchar', length: 10 })
  postcode: string;
  @Column({ type: 'uuid', name: 'city_id' })
  cityId: string;

  @ManyToOne(() => City, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  complement?: string;
}
