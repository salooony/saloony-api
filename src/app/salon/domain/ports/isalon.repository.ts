import { Salon } from '../entities/salon';

export const ISALON_REPOSITORY = 'ISalonRepository';

/**
 * Interface representing the Salon Repository port.

 */
export interface ISalonRepository {
  /**
   * Persists a Salon domain entity.
   * @param salon The salon to save.
   */
  save(salon: Salon): Promise<Salon>;

  /**
   * Retrieves all Salons.
   */
  findAll(): Promise<Salon[]>;

  /**
   * Finds a Salon by its unique identifier.
   * @param id The UUID of the salon.
   */
  findById(id: string): Promise<Salon | null>;
}
