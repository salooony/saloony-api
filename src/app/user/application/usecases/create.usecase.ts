import { ConflictException, Inject, InternalServerErrorException } from '@nestjs/common';
import { UserTransformer } from '../transformers/user.transformer';
import { IUserRepository, USERS_REPOSITORY } from '@app/user/domain/ports/iuser.repository';
import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { HashingProviderInterface } from '../providers/hashing.provider.interface';
import { UserRequestDto } from '../dtos/requests/user.request.dto';

export class CreateUserUsecase {
  constructor(
    private readonly transformer: UserTransformer,
    @Inject('HashingProvider') private hashingProvider: HashingProviderInterface,
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
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
