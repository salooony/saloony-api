import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginRequestDto, LoginResponseDto, HASHING_PROVIDER, IHashingProvider } from '..';
import { UserStatus, USERS_REPOSITORY, IUserRepository, TOKEN_GENERATOR, ITokenGenerator } from '../../domain';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(HASHING_PROVIDER) private hashingProvider: IHashingProvider,
    @Inject(USERS_REPOSITORY) private userRepository: IUserRepository,
    @Inject(TOKEN_GENERATOR) private tokenGenerator: ITokenGenerator,
  ) {}

  async execute(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    // get the user from database
    const user = await this.userRepository.findOneByEmail(loginRequest.email);

    if (!user) throw new BadRequestException("A user with this email address doesn't exist.");

    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedException('Your account has been blocked. Please contact support.');
    }

    // validate the password in the request
    const validCredentials = await this.hashingProvider.compare(loginRequest.password, user.password);

    if (!validCredentials) throw new UnauthorizedException('Invalid credentials.');

    // generate tokens
    const token = await this.tokenGenerator.generateTokens(user);

    if (!token) throw new InternalServerErrorException('Something went wrong, try again later.');

    return LoginResponseDto.createFromEntity(token);
  }
}
