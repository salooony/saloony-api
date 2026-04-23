import { ServiceCategory } from '../enums/service-category.enum';

/**
 * Domain entity representing a bookable service within a salon to decouple core logic from database schemas.
 */
export class Service {
  public id: string | null = null;
  public salonId: string | null = null;
  public name: string | null = null;
  public description: string | null = null;
  public category: ServiceCategory | null = null;
  public active: boolean = false;
  public activatedAt: Date | null = null;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
}
