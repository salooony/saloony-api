import { Country } from './country.entity';

export class City {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly country: Country,
  ) {}
}
