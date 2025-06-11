import { Shop } from '@domain/entities/shop.entity';

// To be completed in a seperate task
export class ShopsResponseDto {
  id: string;
  name: string;
  joinDate: Date;
  description: string;

  private constructor() {}

  static createFromEntity(shop: Shop): ShopsResponseDto {
    const shopResponse = new ShopsResponseDto();

    shopResponse.id = shop.id;
    shopResponse.name = shop.name;
    shopResponse.joinDate = shop.joinDate;
    shopResponse.description = shop.description;

    return shopResponse;
  }
}
