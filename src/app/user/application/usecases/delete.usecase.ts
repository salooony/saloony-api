import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { USERS_REPOSITORY, IUserRepository } from '../../domain/ports/iuser.repository';

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
