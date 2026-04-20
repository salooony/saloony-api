export class Address {
  constructor(
    public readonly id: string,
    public readonly location: {
      latitude: number;
      longitude: number;
    },
    public readonly postcode: string,
    public readonly cityId: string,
    public readonly address: string,
    public readonly complement?: string,
  ) {}
}
