import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  token!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'expired_at', type: 'timestamp' })
  expiredAt!: Date;

  @Column({ name: 'is_hashed', type: 'boolean', default: false })
  isHashed!: boolean;
}
