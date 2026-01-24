export class Country {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly icon: string,
    public readonly name: string,
    public readonly isActive: boolean,
  ) {}
}
