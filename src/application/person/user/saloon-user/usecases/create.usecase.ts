import { UserRequestDto } from '@application/person/dtos/requests/user.request.dto';
import { SaloonUserResponseDto } from '@application/person/dtos/responses/saloon-user.response.dto';
import { SaloonUserTransformer } from '@application/person/transformers/saloon-user.transformer';
import { SaloonUser } from '@domain/entities/person/users/saloon-user.entity';
import { IUserRepository } from '@domain/ports/userRepository.interface';
import { Inject } from '@nestjs/common';

export class CreateSaloonUserUsecase {
  constructor(
    private readonly transformer: SaloonUserTransformer,
    @Inject('UsersRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(saloonUserRequestDto: UserRequestDto): Promise<SaloonUserResponseDto> {
    const saloonUser = this.transformer.toEntity(saloonUserRequestDto) as SaloonUser;

    return SaloonUserResponseDto.createFromEntity(
      (await this.userRepository.save(saloonUser)) as SaloonUser,
    );
  }
}
