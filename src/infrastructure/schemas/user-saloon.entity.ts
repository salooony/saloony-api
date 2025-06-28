import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Saloon } from './saloon.entity';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';

@Entity({ name: 'UserSaloon' })
export class UserSaloon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.saloons)
  @JoinColumn({ name: 'user_d' }) // Specify the foreign key column
  user: User;

  @ManyToOne(() => Saloon, (saloon) => saloon.user_saloon)
  @JoinColumn({ name: 'saloon_id' }) // Specify the foreign key column
  saloon: Saloon;

  @Column({
    type: 'enum',
    enum: SaloonRoles,
    nullable: false,
  })
  role: SaloonRoles;
}
