import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { User } from '@app/user/domain/entities/user';
import { IUploadFileService } from '@app/shared/uploads/domain/ports/iupload-file.service';
import { FilePathService } from '@app/shared/uploads/application/services/file-path.service';
import { FileType } from '@app/shared/uploads/domain/enums/file-type.enum';
import { MultipartFile } from '@app/shared/uploads/domain/interfaces/multipart-file.interface';

@Injectable()
export class UpdateUserAvatarUsecase {
  constructor(
    @Inject('UsersRepository') private readonly userRepository: IUserRepository,
    @Inject('IUploadFileService') private readonly uploadFileService: IUploadFileService,
    private readonly filePathService: FilePathService,
  ) {}

  async execute(file: MultipartFile, user: User): Promise<{ avatar: string }> {
    const filename = await this.uploadFileService.execute(FileType.AVATAR, file);
    const avatarUrl = this.filePathService.getFileUrl(FileType.AVATAR, filename);

    user.avatar = avatarUrl;
    user.updatedAt = new Date();

    const updated = await this.userRepository.update(user);
    return { avatar: updated.avatar };
  }
}
