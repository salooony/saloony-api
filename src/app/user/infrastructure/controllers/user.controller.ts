import { CurrentUser } from '@user/application/decorators/current-user.decorator';
import { Public } from '@user/application/decorators/public.decorator';
import { PatchUserProfileRequestDto } from '@user/application/dtos/requests/patch-user-profile.request.dto';
import { UpdateAvatarDto } from '@user/application/dtos/requests/update-avatar.dto';
import { UserRequestDto } from '@user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@user/application/dtos/responses/user.response.dto';
import { CreateUserUsecase } from '@user/application/usecases/create.usecase';
import { DeleteUserAccountUseCase } from '@user/application/usecases/delete-user-account.usecase';
import { GetUserInfoUsecase } from '@user/application/usecases/get-user-info.usecase';
import { PatchUserProfileUseCase } from '@user/application/usecases/patch-user-profile.usecase';
import { UpdateAvatarUsecase } from '@user/application/usecases/update-avatar.usecase';
import { User } from '@user/domain/entities/user';
import { UserRole } from '@user/domain/enums/user-role.enum';
import { Roles } from '@shared/decorators/roles.decorator';
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
  Patch,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import type { MultipartFile as FastifyMultipartFile } from '@fastify/multipart';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly getUserInfoUsecase: GetUserInfoUsecase,
    private readonly patchUserProfileUseCase: PatchUserProfileUseCase,
    private readonly deleteUserUseCase: DeleteUserAccountUseCase,
    @Inject(UpdateAvatarUsecase) private readonly updateAvatar: UpdateAvatarUsecase,
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

  @ApiOperation({ summary: 'Get personal information' })
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
  async getPersonalInfo(@CurrentUser() user: User): Promise<UserResponseDto> {
    return await this.getUserInfoUsecase.execute(user.id);
  }

  @ApiOperation({ summary: 'Partially update current user profile.' })
  @ApiBearerAuth()
  @ApiBody({
    type: PatchUserProfileRequestDto,
    examples: {
      patchNameAndLanguage: {
        summary: 'Update only first name and language',
        value: {
          firstname: 'Jane',
          language: 'English',
          emailReminders: true,
          smsReminders: false,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile updated successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'One or more of the properties is invalid.' })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Patch payload is empty or has no effective change.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email and/or mobile number already in use.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Patch('/me')
  @Header('Content-Type', 'application/json')
  async patchProfile(
    @CurrentUser() user: User,
    @Body(new ValidationPipe({ transform: true })) request: PatchUserProfileRequestDto,
  ): Promise<UserResponseDto> {
    return await this.patchUserProfileUseCase.execute(user.id, request);
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
}
