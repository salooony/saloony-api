import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCityRequestDto {
  @ApiProperty({
    description: 'City name',
    example: 'Nablus',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Country id',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  countryId: string;
}