import { Service } from '../entities/service';

/** Interface defining the contract for service persistence operations. */
export interface IServiceRepository {
  readonly type?: 'ServiceRepository';

  /** Persists a service to the database. */
  save(service: Service): Promise<Service>;

  /** Finds a service by its unique identifier. */
  findById(id: string): Promise<Service | null>;

  /** Finds all active services. */
  findAllActive(): Promise<Service[]>;
}

export const SERVICE_REPOSITORY = 'IServiceRepository';
