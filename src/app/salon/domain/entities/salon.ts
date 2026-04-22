import { Address } from '@address/domain/entities/address.entity';

export class Salon {
  public id: string;
  public name: string;
  public description: string;
  public address: Address;
  public createdAt: Date;
  public updatedAt: Date;
  public isDeleted: boolean = false;
  public deletedAt: Date | null = null;
}
