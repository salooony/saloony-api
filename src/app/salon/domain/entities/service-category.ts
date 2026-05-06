/** Domain entity representing a dynamic, configurable service category. */
export class ServiceCategory {
  name: string;
  isActive: boolean;
  activatedAt: Date | null;
  deactivatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
