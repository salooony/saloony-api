import { Inject } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { ConfigService } from '@nestjs/config';
import { UpdateAvatarDto } from '../dtos/requests/update-avatar.dto';
import { UploadFileUsecase } from '@app/shared/uploads/application/usecases/upload-file-usecase';

export class UpdateUserAvatarUsecase {
  constructor(
    @Inject('UsersRepository') private readonly userRepository: IUserRepository,
    private readonly uploadFileUsecase: UploadFileUsecase,
    private readonly configService: ConfigService,
  ) { }

  async execute({ file, user }: UpdateAvatarDto): Promise<{ avatar: string }> {

    const filename = await this.uploadFileUsecase.execute({ subFolder: "avatars", file: file });
    const baseUrl = this.configService.get<string>('app.url');
    const avatarUrl = `${baseUrl}/uploads/avatars/${filename}`;
    user.avatar = avatarUrl
    user.updatedAt = new Date()
    const updated = await this.userRepository.save(user)
    return { avatar: updated.avatar! };
  }
}