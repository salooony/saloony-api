import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategory } from '@salon/domain/entities/service-category';

/** Response shape for service category operations. */
export class ServiceCategoryResponseDto {
  @ApiProperty({ description: 'The unique name of the category.', example: 'Hair Care' })
  public name: string;

  @ApiProperty({ description: 'Whether the category is currently active.', example: true })
  public isActive: boolean;

  @ApiProperty({
    description: 'When the category was activated.',
    type: Date,
    example: new Date(),
    nullable: true,
  })
  public activatedAt: Date | null;

  @ApiProperty({ description: 'Timestamp of category creation.', type: Date, example: new Date() })
  public createdAt: Date;

  @ApiProperty({ description: 'Timestamp of last update.', type: Date, example: new Date() })
  public updatedAt: Date;

  private constructor() {}

  /** Maps a domain entity to a safe API response. */
  public static createFromEntity(entity: ServiceCategory): ServiceCategoryResponseDto {
    const dto = new ServiceCategoryResponseDto();
    dto.name = entity.name;
    dto.isActive = entity.isActive;
    dto.activatedAt = entity.activatedAt;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
