import { ServiceCategory } from '../entities/service-category';

/** Port for service category persistence operations. */
export interface IServiceCategoryRepository {
  /** Persists a new service category and returns the mapped domain entity. */
  create(category: ServiceCategory): Promise<ServiceCategory>;
}

export const SERVICE_CATEGORY_REPOSITORY = 'IServiceCategoryRepository';
