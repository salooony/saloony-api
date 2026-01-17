import { MultipartFile } from '../interfaces/multipart-file.interface';
import { FileType } from '../enums/file-type.enum';

export interface IUploadFileService {
  execute(type: FileType, file: MultipartFile): Promise<string>;
}
