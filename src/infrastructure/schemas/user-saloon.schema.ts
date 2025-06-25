import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.schema';
import { Saloon } from './saloon.schema';
import { SaloonRoles } from '@domain/enums/saloon-roles.enum';

@Entity({ name: 'User_Saloon' })
export class User_Saloon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.saloons)
  @JoinColumn({ name: 'userId' }) // Specify the foreign key column
  user: User;

  @ManyToOne(() => Saloon, (saloon) => saloon.user_saloon)
  @JoinColumn({ name: 'saloonId' }) // Specify the foreign key column
  saloon: Saloon;

  @Column({
    type: 'enum',
    enum: SaloonRoles,
    nullable: false,
  })
  role: SaloonRoles;
}
