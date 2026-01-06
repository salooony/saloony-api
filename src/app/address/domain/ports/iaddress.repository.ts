import { Address } from '../entities/address';

export interface IAddressRepository {
  save(address: Address): Promise<Address>;
  findOneById(id: string): Promise<Address | null>;
  findAll(): Promise<Address[]>;
  delete(id: string): Promise<void>;
}
