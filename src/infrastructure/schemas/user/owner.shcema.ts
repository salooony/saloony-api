import { Entity, OneToMany } from 'typeorm';
import { User } from './user.schema';
import { Shop } from '../shops.schema';

@Entity({ name: 'Owner' })
export class Owner extends User {
  @OneToMany(() => Shop, (shop) => shop.owner, { cascade: true })
  shops: Array<Shop>;
}
