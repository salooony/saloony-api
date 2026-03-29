import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { pipeline } from 'stream/promises';
import { IUploadFile } from '../../domain/ports/iupload-file.service';
import { MultipartFile } from '../../domain/interfaces/multipart-file.interface';
import { FileType } from '../../domain/enums/file-type.enum';

@Injectable()
export class UploadFileService implements IUploadFile {
  /**
   * Handles file upload and stores it in the specified folder.
   *
   * @param type - The category/type of the file (used as folder name)
   * @param file - The uploaded multipart file
   * @returns The generated filename after saving the file
   *
   * Steps:
   * 1. Create upload folder if it doesn't exist
   * 2. Generate a unique filename
   * 3. Save the file to disk
   * 4. Return the filename
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
