import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { pipeline } from 'stream/promises';
import { UploadFileRequestDto } from '../dtos/upload-file.dto';

@Injectable()
export class UploadFileUsecase {
  async execute({ subFolder, file }: UploadFileRequestDto): Promise<string> {
    const destFolder = join(process.cwd(), 'uploads', subFolder);
    if (!existsSync(destFolder)) mkdirSync(destFolder, { recursive: true });

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.filename)}`;
    const outPath = join(destFolder, filename);

    await pipeline(file.file, createWriteStream(outPath));
    return filename;
  }
}