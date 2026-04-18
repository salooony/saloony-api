import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocationResponseDto } from './location.response.dto';

export class AddressResponseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty({ type: () => LocationResponseDto })
  public location: LocationResponseDto;

  @ApiProperty({ example: '1234' })
  public postcode: string;

  @ApiProperty({ example: 'uuid-here' })
  public cityId: string;

  @ApiProperty({ example: 'Main St 12' })
  public address: string;

  @ApiPropertyOptional({ example: 'Floor 2' })
  public complement?: string;
}
