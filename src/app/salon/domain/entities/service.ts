import { ServiceCategory } from './service-category';

/** Domain entity representing an independent, bookable service offered across multiple salons. */
export class Service {
  id: string | null = null;
  name: string | null = null;
  description: string | null = null;
  categoryId: string | null = null;
  category: ServiceCategory | null = null;
  active: boolean = true;
  activatedAt: Date | null = null;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  deletedAt: Date | null = null;
}
