import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/** Request payload for creating a new service category. */
export class CreateServiceCategoryDto {
  @ApiProperty({ description: 'The name of the service category.', example: 'Hair Care', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
