/** Domain entity representing an independent, bookable service offered across multiple salons. */
export class Service {
  name: string;
  description: string | null;
  /** Stores only the category name; populate from DB only when explicitly needed. */
  category: string;
  active: boolean;
  activatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  /** Activates this service; idempotent if already active. */
  activate(): void {
    if (this.active) return;
    this.active = true;
    this.activatedAt = new Date();
  }

  /** Deactivates this service; idempotent if already inactive. */
  deactivate(): void {
    if (!this.active) return;
    this.active = false;
  }

  /** Returns true if the service has been soft-deleted. */
  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  /** Marks the service as soft-deleted and deactivates it. */
  softDelete(): void {
    if (this.isDeleted()) return;
    this.deletedAt = new Date();
    this.deactivate();
  }
}
