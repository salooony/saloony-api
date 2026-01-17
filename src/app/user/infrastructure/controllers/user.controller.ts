import { CurrentUser } from '@app/user/application/decorators/current-user.decorator';
import { FastifyRequest } from 'fastify';
import { UserRequestDto } from '@app/user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@app/user/application/dtos/responses/user.response.dto';
import { CreateUserUsecase } from '@app/user/application/usecases/create.usecase';
import { GetUserInfoUsecase } from '@app/user/application/usecases/get-user-info.usecase';
import { User } from '@app/user/domain/entities/user';
import { Body, Controller, Get, Header, HttpStatus, Post, Req, ValidationPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { BadRequestException, Inject } from '@nestjs/common';
import { UpdateUserAvatarUsecase } from '@app/user/application/usecases/update-user-avatar.usecase';
import { UpdateAvatarDto } from '../../application/dtos/requests/update-avatar.dto';
import { Public } from '@app/user/application/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly getUserInfoUsecase: GetUserInfoUsecase,
    @Inject(UpdateUserAvatarUsecase) private readonly updateUserAvatar: UpdateUserAvatarUsecase,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user was registered successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more of the submitted properties was not entered properly.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'A user with the same email and/or mobileNumber already exists.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Public()
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) userRequest: UserRequestDto): Promise<UserResponseDto> {
    return await this.createUsecase.execute(userRequest);
  }

  @ApiOperation({ summary: 'Get personla information' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The information of the user were retrieved successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Get('/me')
  @Header('Content-Type', 'application/json')
  async getPeronalInfo(@CurrentUser() user: User): Promise<UserResponseDto> {
    return await this.getUserInfoUsecase.execute(user.id);
  }

  @Put('profile/avatar')
  @ApiOperation({ summary: 'Update user avatar' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAvatarDto })
  public async uploadAvatar(@CurrentUser() user: User, @Req() req: FastifyRequest) {
    const filePart = await req.file();

    if (!filePart) {
      throw new BadRequestException('Avatar file is required');
    }

    return await this.updateUserAvatar.execute(filePart, user);
  }
}
