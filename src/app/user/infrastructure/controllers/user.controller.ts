import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/shared/decorators/roles.decorator';
import { CurrentUser } from '@user/application/decorators/current-user.decorator';
import { Public } from '@user/application/decorators/public.decorator';
import { CodeVerificationRequestDto } from '@user/application/dtos/requests/code-verification.request.dto';
import { UserRequestDto } from '@user/application/dtos/requests/user.request.dto';
import { CodeVerificationResponseDto } from '@user/application/dtos/responses/code-verification.response.dto';
import { UserResponseDto } from '@user/application/dtos/responses/user.response.dto';
import { CreateUserUsecase } from '@user/application/usecases/create.usecase';
import { DeleteUserAccountUseCase } from '@user/application/usecases/delete-user-account.usecase';
import { VerifyEmailUseCase } from '@user/application/usecases/verify-email.usecase';
import { GetUserInfoUsecase } from '@user/application/usecases/get-user-info.usecase';
import { GetCodeVerificationUseCase } from '@user/application/usecases/get-code-verification.usecase';
import { RequestPhoneVerificationUseCase } from '@user/application/usecases/request-phone-verification.usecase';
import { User } from '@user/domain/entities/user';
import { UserRole } from '@user/domain/enums/user-role.enum';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly getUserInfoUsecase: GetUserInfoUsecase,
    private readonly deleteUserUseCase: DeleteUserAccountUseCase,
    private readonly requestEmailVerificationUseCase: GetCodeVerificationUseCase,
    private readonly requestPhoneVerificationUseCase: RequestPhoneVerificationUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
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
  async create(@Body() userRequest: UserRequestDto): Promise<UserResponseDto> {
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
  async getPersonalInfo(@CurrentUser() user: User): Promise<UserResponseDto> {
    return await this.getUserInfoUsecase.execute(user.id);
  }

  @ApiOperation({ summary: 'Delete current user account.' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Account deleted successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Something went wrong, try again.' })
  @Delete('/me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@CurrentUser() user: User): Promise<void> {
    await this.deleteUserUseCase.execute(user.id);
  }

  @ApiOperation({ summary: 'Delete user account (Admin).' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Account deleted successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User should be logged in.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Something went wrong, try again.' })
  @Roles(UserRole.ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') userId: string): Promise<void> {
    await this.deleteUserUseCase.execute(userId);
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

  @Post('verify/email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm email verification code' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email verified successfully.',
    type: CodeVerificationResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid verification code format.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid verification code.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already verified.' })
  async confirmEmailVerification(
    @CurrentUser() user: User,
    @Body() dto: CodeVerificationRequestDto,
  ): Promise<CodeVerificationResponseDto> {
    return await this.verifyEmailUseCase.execute(user, dto.code);
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
