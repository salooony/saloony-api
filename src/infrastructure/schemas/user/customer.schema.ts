import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Location } from '../location.schema';
import { User } from './user.schema';

@Entity({ name: 'Customer' })
export class Customer extends User {
  @OneToOne(() => Location, { cascade: true })
  @JoinColumn()
  location: Location;
}
