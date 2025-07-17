import { UserRequestDto } from '@application/user/dtos/requests/user.request.dto';
import { IUserRepository } from '@domain/ports/iuser.repository';
import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';
import { UserTransformer } from '@application/user/transformers/user.transformer';
import { UserResponseDto } from '@application/user/dtos/responses/user.response.dto';
import { HashingProviderInterface } from '@application/providers/hashing.provider.interface';

export class CreateUserUsecase {
  constructor(
    private readonly transformer: UserTransformer,
    @Inject('HashingProvider') private hashingProvider: HashingProviderInterface,
    @Inject('UsersRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    const user = this.transformer.toEntity(userRequestDto);
    user.password = await this.hashingProvider.hash(user.password);
    try {
      const createdUser = await this.userRepository.save(user);

      return UserResponseDto.createFromEntity(createdUser);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException(
          'A user with the same email and/or mobileNumber already exists.',
        );
      }

      throw new InternalServerErrorException('Failed to create user.');
    }
  }
}
