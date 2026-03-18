import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notification_templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  key: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  defaultParameters: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
