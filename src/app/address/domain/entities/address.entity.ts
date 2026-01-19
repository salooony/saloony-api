import { City } from './city.entity';
export class Address {
  constructor(
    public readonly id: string,
    public readonly street: string,
    public readonly city: City,
  ) {}
}
