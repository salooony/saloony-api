import { Readable } from 'stream';

export interface MultipartFile {
  type: 'file';
  toBuffer: () => Promise<Buffer>;
  file: Readable;
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  fields: Record<string, any>;
}
