import { City } from '@app/city/domain/entities/city';

export interface ICityRepository {
  findAll(): Promise<City[]>;
  findOneById(id: string): Promise<City | null>;
}
