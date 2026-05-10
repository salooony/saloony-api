// import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

// @Entity('password_reset_tokens')
// @Index(['userId', 'expiresAt'])
// export class PasswordResetToken {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'uuid' })
//   userId: string;

//   @Column({ type: 'varchar', length: 64, unique: true })
//   tokenHash: string;

//   @Column()
//   expiresAt: Date;

//   @Column({ nullable: true })
//   usedAt?: Date;

//   @Column({ type: 'varchar', default: 'password_reset' })
//   type?: string;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;
// }
