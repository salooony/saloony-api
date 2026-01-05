import { User } from '@app/user/domain/entities/user';
import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';

export class GetUserInfoUsecase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findOneById(user.id);

    return UserResponseDto.createFromEntity(userEntity);
  }
}
