import { Module } from '@nestjs/common';
import { UploadFileService } from '../../application/services/upload-file.service';
import { FilePathService } from '../../application/services/file-path.service';

@Module({
  providers: [
    {
      provide: 'IUploadFileService',
      useClass: UploadFileService,
    },
    FilePathService,
  ],
  exports: ['IUploadFileService', FilePathService],
})
export class FileModule {}
