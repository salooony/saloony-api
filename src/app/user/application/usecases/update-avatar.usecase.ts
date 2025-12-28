import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, USERS_REPOSITORY } from '@user/domain/ports/iuser.repository';
import { User } from '@user/domain/entities/user';
import { IUploadFile, UPLOAD_FILE } from '@shared/uploads/domain/ports/iupload-file.service';
import { FilePathService } from '@shared/uploads/application/services/file-path.service';
import { FileType } from '@shared/uploads/domain/enums/file-type.enum';
import { MultipartFile } from '@shared/uploads/domain/interfaces/multipart-file.interface';

@Injectable()
export class UpdateAvatarUsecase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(UPLOAD_FILE) private readonly uploadFile: IUploadFile,
    private readonly filePathService: FilePathService,
  ) {}

  async execute(file: MultipartFile, user: User): Promise<void> {
    const filename = await this.uploadFile.execute(FileType.IMAGE, file);
    const avatarUrl = this.filePathService.createFileUrl(filename, FileType.IMAGE);

    user.avatar = avatarUrl;
    user.updatedAt = new Date();

    await this.userRepository.update(user);
  }
}