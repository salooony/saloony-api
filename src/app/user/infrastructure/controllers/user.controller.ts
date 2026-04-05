import { CurrentUser } from '@user/application/decorators/current-user.decorator';
import { Roles } from '@shared/decorators/roles.decorator';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { Public } from '@user/application/decorators/public.decorator';
import { UserRequestDto } from '@user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@user/application/dtos/responses/user.response.dto';
import { CreateUserUsecase } from '@user/application/usecases/create.usecase';
import { DeleteUserAccountUseCase } from '@user/application/usecases/delete-user-account.usecase';
import { GetUserInfoUsecase } from '@user/application/usecases/get-user-info.usecase';
import { User } from '@user/domain/entities/user';
import { RequestEmailVerificationUseCase } from '@app/user/application/usecases/request-email-verification.usecase';
import { RequestPhoneVerificationUseCase } from '@app/user/application/usecases/request-phone-verification.usecase';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAvatarUsecase } from '@user/application/usecases/update-avatar.usecase';
import { UpdateAvatarDto } from '@user/application/dtos/requests/update-avatar.dto';
import { FastifyRequest } from 'fastify';
import type { MultipartFile as FastifyMultipartFile } from '@fastify/multipart';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly getUserInfoUsecase: GetUserInfoUsecase,
    private readonly deleteUserUseCase: DeleteUserAccountUseCase,
    @Inject(UpdateAvatarUsecase) private readonly updateAvatar: UpdateAvatarUsecase,
    private readonly requestEmailVerificationUseCase: RequestEmailVerificationUseCase,
    private readonly requestPhoneVerificationUseCase: RequestPhoneVerificationUseCase,
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

  @ApiOperation({ summary: 'Delete current user account.' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Account deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Delete('/me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@CurrentUser() user: User): Promise<void> {
    await this.deleteUserUseCase.execute(user.id);
  }

  @ApiOperation({ summary: 'Delete user account (Admin).' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Account deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Roles(UserRole.ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') userId: string): Promise<void> {
    await this.deleteUserUseCase.execute(userId);
  }

  @Put('profile/avatar')
  @ApiOperation({ summary: 'Update user avatar' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user avatar was updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Avatar file is required.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAvatarDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async uploadAvatar(
    @CurrentUser() user: User,
    @Req() req: FastifyRequest & { file: () => Promise<FastifyMultipartFile | undefined> },
  ): Promise<void> {
    const filePart = await req.file();

    if (!filePart) {
      throw new BadRequestException('Avatar file is required');
    }

    await this.updateAvatar.execute(filePart, user);
  }

  @Post('email/validate/request')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Request email verification code' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Verification code sent.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already verified.' })
  async requestEmailVerification(@CurrentUser() user: User): Promise<void> {
    await this.requestEmailVerificationUseCase.execute(user);
  }

  // TODO: Add rate limiting (@Throttle decorator) when rate limiting module is implemented
  @Post('phone/validate/request')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Request phone verification code' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Verification code sent.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Phone already verified.' })
  @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Notification service unavailable.' })
  async requestPhoneVerification(@CurrentUser() user: User): Promise<void> {
    await this.requestPhoneVerificationUseCase.execute(user);
  }
}
