import { User } from '@app/user/domain/entities/user';

export class UpdateAvatarDto {
  file: any;
  user: User;
}