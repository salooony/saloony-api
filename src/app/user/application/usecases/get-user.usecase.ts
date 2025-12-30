import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { User } from '@app/user/domain/entities/user';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
