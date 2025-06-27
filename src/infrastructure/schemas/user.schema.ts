import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '@domain/enums/roles.enum';
import { User_Saloon } from './user-saloon.schema';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public firstname: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public lastname: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  public birthdate: Date;

  @Column({
    type: 'varchar',
    length: 100,
    // nullable: false,
  })
  public imageURL: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
    unique: true,
  })
  public mobileNumber: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public password: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  public joinDate: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public language: string;

  @Column({
    type: 'enum',
    enum: Roles,
    nullable: false,
  })
  public role: Roles;

  @OneToMany(() => User_Saloon, (user_saloon) => user_saloon.user)
  saloons: User_Saloon[];
}
