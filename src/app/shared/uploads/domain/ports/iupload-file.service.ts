import { MultipartFile } from '../interfaces/multipart-file.interface';
import { FileType } from '../enums/file-type.enum';

export const UPLOAD_FILE = 'IUploadFile';

export interface IUploadFile {
  execute(type: FileType, file: MultipartFile): Promise<string>;
}