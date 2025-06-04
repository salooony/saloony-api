import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Location' })
export class Location {
  @PrimaryGeneratedColumn() // param?
  id: String;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  latitude: Number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  longitude: Number;
}
