import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index, UpdateDateColumn } from 'typeorm';
import { NotificationType } from '@notification/domain/enums/notification-type.enum';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  @Index()
  userId: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    name: 'type',
  })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'boolean', default: false, name: 'is_read' })
  @Index()
  isRead: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'read_at' })
  readAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  public markAsRead(): void {
    if (!this.isRead) {
      this.isRead = true;
      this.readAt = new Date();
    }
  }
}
