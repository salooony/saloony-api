import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '@domain/enums/roles.enum';
import { UserSaloon } from './user-saloon.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'mobile_number', length: 15, unique: true })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserSaloon, (userSaloon) => userSaloon.user)
  saloons: UserSaloon[];
}
