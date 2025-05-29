import { Person } from '@domain/entities/person/person.entity';
import { PersonRequestDto } from '../dtos/requests/person.request';

export abstract class PersonTransformer {
  toEntity(personRequest: PersonRequestDto) {
    const person = this.internalProps(personRequest);

    person.firstname = personRequest.firstname;
    person.lastname = personRequest.lastname;
    person.birthdate = personRequest.birthdate;
    person.imageURL = '';

    return person;
  }

  abstract internalProps(personRequest: PersonRequestDto): Person;
}
