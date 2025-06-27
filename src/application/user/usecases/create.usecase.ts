import { UserRequestDto } from '@application/user/dtos/requests/user.request.dto';
import { IUserRepository } from '@domain/ports/userRepository.interface';
import { ConflictException, Inject } from '@nestjs/common';
import { UserTransformer } from '../transformers/user.transformer';
import { UserResponseDto } from '../dtos/responses/user.response';

export class CreateUserUsecase {
  constructor(
    private readonly transformer: UserTransformer,
    @Inject('UsersRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    const user = this.transformer.toEntity(userRequestDto);

    let databaseResponse;

    try {
      databaseResponse = await this.userRepository.save(user);
    } catch (error) {
      if (error.message.includes('duplicate key')) {
        throw new ConflictException(
          'A user with the same email and/or mobileNumber already exists.',
        );
      } else console.log(error.message);
    }

    return UserResponseDto.createFromEntity(databaseResponse);
  }
}
