import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSaloon } from './user-saloon.entity';

@Entity({ name: 'Saloon' })
export class Saloon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @OneToMany(() => UserSaloon, (user_saloon) => user_saloon.saloon)
  user_saloon: UserSaloon[];
}
