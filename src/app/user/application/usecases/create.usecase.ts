import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';

import { UserRequestDto } from '../dtos/requests/user.request.dto';
import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { HASHING_PROVIDER, IHashingProvider } from '../providers/ihashing.provider';
import { UserTransformer } from '../transformers/user.transformer';
import { IUserRepository, USERS_REPOSITORY } from '../../domain/ports/iuser.repository';

export class CreateUserUsecase {
  constructor(
    // TOOD: readonly or no readonly?
    @Inject(HASHING_PROVIDER) private hashingProvider: IHashingProvider,
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly transformer: UserTransformer,
  ) {}

  async execute(userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    const user = this.transformer.toEntity(userRequestDto);
    user.password = await this.hashingProvider.hash(user.password);
    try {
      const createdUser = await this.userRepository.save(user);

      return UserResponseDto.createFromEntity(createdUser);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException('A user with the same email and/or mobileNumber already exists.');
      }
      console.log(error);

      throw new InternalServerErrorException('Failed to create user.');
    }
  }
}
