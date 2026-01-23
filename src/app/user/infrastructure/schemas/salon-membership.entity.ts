import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Saloon } from '../../../saloon/infrastructure/schemas/saloon.entity';
import { SalonRole } from '../../../saloon/domain/enums/salon-role.enum';

@Entity({ name: 'salon_memberships' })
@Unique(['userId', 'salonId'])
export class SalonMembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Saloon, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'salon_id' })
  salon: Saloon;

  @Column({ name: 'salon_id' })
  salonId: number;

  @Column({
    type: 'enum',
    enum: SalonRole,
  })
  role: SalonRole;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
