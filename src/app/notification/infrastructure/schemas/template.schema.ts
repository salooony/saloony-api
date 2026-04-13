import { NotificationType } from '@notification/domain/enums/notification-type.enum';
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity('notification_templates')
@Unique(['key', 'type'])
export class Template {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  key: string;

  @PrimaryColumn({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  defaultParameters: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
