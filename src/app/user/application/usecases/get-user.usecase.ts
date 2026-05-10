import { Inject, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from '..';
import { IUserRepository, USERS_REPOSITORY } from '../../domain';

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
