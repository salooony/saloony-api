import { Module } from '@nestjs/common';
import { UploadFileUsecase } from '../../application/usecases/upload-file-usecase';
@Module({
  providers: [UploadFileUsecase],
  exports: [UploadFileUsecase],
})
export class FileModule {}