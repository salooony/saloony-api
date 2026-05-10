import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategory } from '@salon/domain/entities/service-category';

/** Response shape for admin service category creation. */
export class ServiceCategoryResponseDto {
  @ApiProperty({ description: 'The unique name of the created category.', example: 'Hair Care' })
  public name: string;

  private constructor() {}

  /** Maps a domain entity to a safe API response. */
  public static createFromEntity(entity: ServiceCategory): ServiceCategoryResponseDto {
    const dto = new ServiceCategoryResponseDto();
    dto.name = entity.name;
    return dto;
  }
}
