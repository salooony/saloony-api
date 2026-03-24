import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityRequestDto {
  @ApiProperty({
    description: 'City name',
    example: 'Gaza',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Country id',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  countryId: string;
}
