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
   */
  async execute(type: FileType, file: MultipartFile): Promise<string> {
    // Create upload folder if it doesn't exist
    const destFolder = join(process.cwd(), 'uploads', type);

    if (!existsSync(destFolder)) {
      mkdirSync(destFolder, { recursive: true });
    }

    // Generate a unique filename
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.filename)}`;
    const outPath = join(destFolder, filename);

    // Save the file to disk
    await pipeline(file.file, createWriteStream(outPath));

    // Return the filename
    return filename;
  }
}
