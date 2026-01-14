import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from '../dtos/requests/login.request.dto';
import { LoginResponseDto } from '../dtos/responses/login.response.dto';
import { HashingProviderInterface } from '../providers/hashing.provider.interface';
import { IUserRepository } from '@app/user/domain/ports/iuser.repository';
import { ITokenGenerator } from '@app/user/domain/ports/itoken-generator.provider';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject('HashingProvider') private hashingProvider: HashingProviderInterface,
    @Inject('UsersRepository') private readonly userRepository: IUserRepository,
    @Inject('TokenGenerator') private tokenGenerator: ITokenGenerator,
  ) { }

  async execute(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    // get the user from database
    const user = await this.userRepository.findOneByEmail(loginRequest.email);

    if (!user) throw new BadRequestException("A user with this email address doesn't exist.");

    // validate the password in the request
    const validCredentials = await this.hashingProvider.compare(loginRequest.password, user.password);

    if (!validCredentials) throw new UnauthorizedException('Invalid credentials.');

    // generate tokens
    const token = await this.tokenGenerator.generateTokens(user);

    if (!token) throw new InternalServerErrorException('Something went wrong, try again later.');

    return LoginResponseDto.createFromEntity(token);
  }
}
