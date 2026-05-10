import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IUserRepository, USERS_REPOSITORY } from '../../domain';

@Injectable()
export class DeleteUserAccountUsecase {
  constructor(@Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.deleteOneById(userId);
  }
}
