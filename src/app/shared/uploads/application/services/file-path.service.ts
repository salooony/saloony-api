import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileType } from '../../domain/enums/file-type.enum';

@Injectable()
export class FilePathService {
  constructor(private readonly configService: ConfigService) {}

  getFileUrl(type: FileType, filename: string): string {
    const baseUrl = this.configService.get<string>('app.url');
    return `${baseUrl}/uploads/${type}/${filename}`;
  }
}
