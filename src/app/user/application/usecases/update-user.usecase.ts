import { User } from '@app/user/domain/entities/user';
import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { UpdateUserRequestDto } from '../dtos/requests/update-user.request.dto';
import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { UpdateUserCriteria } from '@app/user/domain/criteria/update-user.criteria';

export class UpdateUserUsecase {
  constructor(@Inject('UsersRepository') private readonly userRepository: IUserRepository) {}

  async execute(user: User, updateUser: UpdateUserRequestDto): Promise<void> {
    const updateCriteria = this.buildCriteria(updateUser);

    try {
      await this.userRepository.updateOneById(user.id, updateCriteria);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException(
          'A user with the same email and/or mobileNumber already exists.',
        );
      }
      console.log(error);

      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  private buildCriteria(updateUser: UpdateUserRequestDto): UpdateUserCriteria {
    const criteria: UpdateUserCriteria = {};

    if (updateUser.firstname) {
      criteria.firstname = updateUser.firstname;
    }

    if (updateUser.lastname) {
      criteria.lastname = updateUser.lastname;
    }

    if (updateUser.birthdate) {
      criteria.birthdate = updateUser.birthdate;
    }

    if (updateUser.email) {
      criteria.email = updateUser.email;
    }

    if (updateUser.mobileNumber) {
      criteria.mobileNumber = updateUser.mobileNumber;
    }

    if (updateUser.language) {
      criteria.language = updateUser.language;
    }

    return criteria;
  }
}
