import { User } from '@app/user/domain/entities/user';
import { UpdateUserRequestDto } from '../dtos/requests/update-user.request.dto';
import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { UpdateUserCriteria } from '@app/user/domain/criteria/update-user.criteria';

export class UpdateUserUsecase {
  constructor(@Inject('UsersRepository') private readonly userRepository: IUserRepository) {}

  async execute(user: User, updateUser: UpdateUserRequestDto): Promise<void> {
    const updateCriteria = Object.fromEntries(
      Object.entries(updateUser).filter(([, value]) => value !== undefined),
    ) as UpdateUserCriteria;

    try {
      await this.userRepository.updateOneById(user.id, updateCriteria);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException('A user with the same email and/or mobileNumber already exists.');
      }

      throw new InternalServerErrorException('Failed to update user information.');
    }
  }
}
