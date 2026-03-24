import { Module } from '@nestjs/common';
import { UploadFileService } from '../../application/services/upload-file.service';
import { FilePathService } from '../../application/services/file-path.service';
import { UPLOAD_FILE } from '../../domain/ports/iupload-file.service';

@Module({
  providers: [
    {
      provide: UPLOAD_FILE,
      useClass: UploadFileService,
    },
    FilePathService,
  ],
  exports: [UPLOAD_FILE, FilePathService],
})
export class FileModule {}
