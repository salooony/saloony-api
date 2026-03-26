import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserStatus } from '@user/domain/enums/user-status.enum';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { SalonMembership } from './salon-membership.schema';
import { OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid') // discuss this
  id: string;

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

  @Column({ type: 'varchar', length: 512 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT }) // defaulting to CLIENT for safety
  role: UserRole;

  @OneToMany('SalonMembership', (membership: SalonMembership) => membership.user)
  salonMemberships: SalonMembership[];

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  @Index()
  status: UserStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'varchar', array: true })
  acl: string[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;
}
