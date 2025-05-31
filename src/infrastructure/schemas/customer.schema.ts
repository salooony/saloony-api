import { Customer } from '@domain/entities/person/users/customer.entitiy';
import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from 'typeorm';
/*
@Entity()
export class Customer {
  @PrimaryGeneratedColumn() // param?
  id: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 50,
  // nullable: false,
  // }
  public firstname: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 50,
  // nullable: false,
  // }
  public lastname: String;

  @Column()
  // {
  // type: 'date',
  // nullable: false,
  // }
  public birthdate: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 100,
  // nullable: false,
  // }
  public imageURL: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 50,
  // nullable: false,
  // }
  public email: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 10,
  // nullable: false,
  // }
  public mobileNumber: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 50,
  // nullable: false,
  // }
  public password: String;

  @Column()
  // {
  // type: 'date',
  // nullable: false,
  // }
  public joinDate: Date;

  @Column()
  // {
  // type: 'varchar',
  // length: 100,
  // nullable: false,
  // }
  public calendarURL: String;

  @Column()
  // {
  // type: 'varchar',
  // length: 50,
  // nullable: false,
  // }
  public location: String;
}*/

export const CustomerSchema = new EntitySchema<Customer>({
  name: 'Customer',
  target: Customer,
  columns: {
    id: {
      type: String,
      primary: true,
      generated: true,
    },
    firstname: { type: String },
    lastname: { type: String },
    birthdate: { type: Date },
    imageURL: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
    joinDate: { type: Date },
    calendarURL: { type: String },
    location: { type: String },
  },
});
