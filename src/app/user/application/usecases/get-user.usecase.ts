import { Inject, NotFoundException } from '@nestjs/common';

import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { USERS_REPOSITORY, IUserRepository } from '../../domain/ports/iuser.repository';

export class GetUserInfoUsecase {
  constructor(@Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findOneById(userId);

    if (!userEntity) {
      throw new NotFoundException('User not found.');
    }

    return UserResponseDto.createFromEntity(userEntity);
  }
}
