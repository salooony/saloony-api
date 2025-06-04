import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn() // param?
  id: String;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public firstname: String;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public lastname: String;

  @Column({
    type: 'date',
    nullable: false,
  })
  public birthdate: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public imageURL: String;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public email: String;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  public mobileNumber: String;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public password: String;

  @Column({
    type: 'date',
    nullable: false,
  })
  public joinDate: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public calendarURL: String;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public language: String;
}
