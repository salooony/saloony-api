import { Readable } from 'stream';

/**
 * Represents a file uploaded via a multipart/form-data request.
 * Provides a unified structure for handling uploaded files
 * across different upload implementations.
 */
export interface MultipartFile {
  /**
   * The type of multipart part.
   * Always set to 'file' for file uploads.
   */
  type: 'file';

  /**
   * Converts the file stream into a Buffer.
   * Use this only for small files, as it loads the entire file into memory.
   *
   * @returns Promise resolving to the file content as Buffer
   */
  toBuffer: () => Promise<Buffer>;

  /**
   * Readable stream of the file content.
   * Preferred for large files to avoid high memory usage.
   */
  file: Readable;

  /**
   * Name of the form field used in the upload request.
   * Example: 'avatar', 'document'
   */
  fieldname: string;

  /**
   * Original filename provided by the client.
   * Example: 'photo.jpg', 'report.pdf'
   */
  filename: string;

  /**
   * Encoding type of the uploaded file.
   * Example: '7bit', 'binary', 'base64'
   */
  encoding: string;

  /**
   * MIME type reported by the client.
   * Example: 'image/jpeg', 'application/pdf'
   */
  mimetype: string;

  /**
   * Additional fields associated with this file part.
   */
  fields: Record<string, any>;
}
