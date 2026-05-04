import { ServiceCategory } from './service-category';

/** Domain entity representing an independent, bookable service offered across multiple salons. */
export class Service {
  id!: string;
  name!: string;
  description!: string;
  categoryId!: string;
  category!: ServiceCategory;
  active: boolean = true;
  activatedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
}
