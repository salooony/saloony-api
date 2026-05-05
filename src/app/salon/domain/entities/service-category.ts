/** Domain entity representing a dynamic, configurable service category. */
export class ServiceCategory {
  name: string;
  isActive: boolean;
  activatedAt: Date | null;
  deactivatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  /** Activates this category; idempotent if already active. */
  activate(): void {
    if (this.isActive) return;
    this.isActive = true;
    this.activatedAt = new Date();
    this.deactivatedAt = null;
  }

  /** Deactivates this category; idempotent if already inactive. */
  deactivate(): void {
    if (!this.isActive) return;
    this.isActive = false;
    this.deactivatedAt = new Date();
  }
}
