import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { User } from '@app/user/domain/entities/user';
import { CurrentUser } from '../decorators/current-user.decorator';

@Injectable()
export class DeleteUserAccountUseCase {
    constructor(@Inject('UsersRepository') private readonly userRepository: IUserRepository) { }

    async execute(@CurrentUser() _user: User): Promise<void> {
        const user = await this.userRepository.findOneById(_user.id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.delete(_user.id);
    }
}
