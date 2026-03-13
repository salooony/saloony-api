import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TokenPurpose } from '@token/domin/enums/token-purpose.enum';
import { User } from '@user/infrastructure/schemas/user.schema';

@Entity('tokens')
export class TokenSchema {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  token!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  expiredAt!: Date | null;

  @Column({ name: 'is_hashed', type: 'boolean', default: false })
  isHashed!: boolean;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId!: string;

  @Column({ name: 'type', type: 'varchar' })
  type!: TokenPurpose;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;
}
