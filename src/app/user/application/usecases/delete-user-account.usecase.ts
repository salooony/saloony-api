import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
@Injectable()
export class DeleteUserAccountUseCase {
  constructor(@Inject('UsersRepository') private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(userId);
  }
}
