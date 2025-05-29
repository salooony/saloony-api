import { Person } from '@domain/entities/person/person.entity';

export abstract class PersonMapper {
  //   private static person: Person;

  //   private constructor() {}

  //   static getInstance() {
  //     if (this.person === null) {
  //       this.person = new Person();
  //     }
  //     return this.person;
  //   }

  map(personDocument: Person): Person {
    const person = this.internalProps(personDocument);

    // person.id =
    // person.firstname =
    // person.lastname =
    // person.birthdate =
    // person.imageURL =

    return person;
  }

  abstract internalProps(personDocument: Person): Person;
}
