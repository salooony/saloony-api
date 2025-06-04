import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from './user/owner.shcema';

@Entity({ name: 'Shop' })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ManyToOne(() => Owner, (admin) => admin.shops)
  owner: Owner;
}
