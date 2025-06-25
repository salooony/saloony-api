import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User_Saloon } from './user-saloon.schema';

@Entity({ name: 'Saloon' })
export class Saloon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @OneToMany(() => User_Saloon, (user_saloon) => user_saloon.saloon)
  user_saloon: User_Saloon[];
}
