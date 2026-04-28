import { ServiceCategory } from './service-category';

/** Domain entity representing an independent, bookable service offered across multiple salons. */
export class Service {
  public id: string | null = null;
  public name: string | null = null;
  public description: string | null = null;
  public categoryId: string | null = null;
  public category: ServiceCategory | null = null;
  public active: boolean = true;
  public activatedAt: Date | null = null;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
}
