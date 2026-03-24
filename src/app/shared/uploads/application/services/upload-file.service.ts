import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { pipeline } from 'stream/promises';
import { MultipartFile } from '../../domain/interfaces/multipart-file.interface';
import { IUploadFile } from '../../domain/ports/iupload-file.service';
import { FileType } from '../../domain/enums/file-type.enum';

@Injectable()
export class UploadFileService implements IUploadFile {
  /**
   * Stores the uploaded multipart file in the given category folder
   * and returns the generated filename.
   */
  async execute(type: FileType, file: MultipartFile): Promise<string> {
    const destFolder = join(process.cwd(), 'uploads', type);

    if (!existsSync(destFolder)) {
      mkdirSync(destFolder, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.filename)}`;
    const outPath = join(destFolder, filename);

    await pipeline(file.file, createWriteStream(outPath));

    return filename;
  }
}
