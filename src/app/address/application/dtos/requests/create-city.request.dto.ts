import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityRequestDto {
  @ApiProperty({
    example: 'Nablus',
    description: 'City name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '65f1c2e8a1b2c3d4e5f6g7h8',
    description: 'Country ID',
  })
  @IsString()
  @IsNotEmpty()
  countryId: string;
}
