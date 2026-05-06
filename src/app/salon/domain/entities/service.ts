/** Domain entity representing an independent, bookable service offered across multiple salons. */
export class Service {
  name: string;
  description: string;
  /** Stores only the category name; populate from DB only when explicitly needed. */
  category: string;
  active: boolean;
  activatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
