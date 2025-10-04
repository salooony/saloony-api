import { User } from '@app/user/domain/entities/user';
import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { InternalServerErrorException } from '@nestjs/common';

export class GetUserInfoUsecase {
  constructor() {}

  async execute(user: User | number): Promise<UserResponseDto> {
    if (user instanceof User) {
      return UserResponseDto.createFromEntity(user);
    }

    // TODO: implement get user details with their id (when permissions are determined)
    throw new InternalServerErrorException();
  }
}
