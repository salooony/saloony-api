import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileType } from '../../domain/enums/file-type.enum';


@Injectable()
export class FilePathService {
  constructor(private readonly configService: ConfigService) {}

  createFileUrl(filename: string, type: FileType): string {
    return `${this.configService.get<string>('app.url')}/uploads/${type}/${filename}`;
  }
}