import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Salon } from '../../../salon/infrastructure/schemas/salon.entity';
import { SalonRole } from '@salon/domain/enums/salon-role.enum';

@Entity({ name: 'salons_users' })
@Unique(['userId', 'salonId'])
export class SalonMembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne('Salon', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'salon_id' })
  salon: Salon;

  @Column({ name: 'salon_id' })
  salonId: string;

  @Column({
    type: 'enum',
    enum: SalonRole,
  })
  role: SalonRole;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
