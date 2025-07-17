import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Saloon } from './saloon.entity';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';

@Entity({ name: 'user_saloon' })
export class UserSaloon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.saloons)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Saloon, (saloon) => saloon.userSaloons)
  @JoinColumn({ name: 'saloon_id' })
  saloon: Saloon;

  @Column({ type: 'enum', enum: SaloonRoles, nullable: false })
  role: SaloonRoles;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
