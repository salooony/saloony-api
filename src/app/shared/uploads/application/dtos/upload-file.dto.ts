// src/app/uploads/application/dtos/upload-image.dto.ts
import { ApiProperty } from '@nestjs/swagger';


export class UploadFileRequestDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to upload'
  })
  file: any;

  subFolder?: string;
}

