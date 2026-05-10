import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';

import { UserRequestDto, UserResponseDto, HASHING_PROVIDER, IHashingProvider, UserTransformer } from '..';
import { IUserRepository, USERS_REPOSITORY } from '../../domain';

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
