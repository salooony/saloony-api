import { Entity } from 'typeorm';
import { User } from './user.schema';

@Entity({ name: 'Customer' })
export class Customer extends User {}
