import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TemplateType, TemplateKey } from '../../domain/enums/template-type.enum';

@Entity('notification_templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TemplateKey,
    unique: true,
  })
  key: TemplateKey;

  @Column({
    type: 'enum',
    enum: TemplateType,
  })
  type: TemplateType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  defaultParameters: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
