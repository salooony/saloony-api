import { Address } from '@address/domain/entities/address.entity';

export class Salon {
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public addressId: string | null = null;
  public description: string;
  public deletedAt: Date | null = null;
  public address: Address | null = null;
}
