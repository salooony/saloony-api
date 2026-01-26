import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@user/infrastructure/schemas/user.entity';
import { TokenType } from '@token/domin/enums/token-type.enum';

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

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @Column({ name: 'type', type: 'varchar' })
  type!: TokenType;
}
