import { ApiProperty } from '@nestjs/swagger';

/**
 * Describes the request body for updating the user avatar.
 *
 * Swagger/OpenAPI represents uploaded files as a string with binary format.
 * This is used only for API documentation and generating the upload field
 * in Swagger UI, while the actual file is processed by the endpoint logic.
 */
export class UpdateAvatarDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Binary avatar file to be uploaded.',
    required: true,
  })
  file: string;
}