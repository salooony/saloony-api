import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  Public,
  LoginRequestDto,
  LoginResponseDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDTO,
  LoginUsecase,
  ForgotPasswordUsecase,
  ResetPasswordUsecase,
} from '../../application';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly forgotPasswordUseCase: ForgotPasswordUsecase,
    private readonly resetPasswordUseCase: ResetPasswordUsecase,
  ) {}

  //Login Endpoint
  @ApiOperation({ summary: 'Login the user and recieve access & refresh tokens.' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login was successful.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more of the submitted properties was not entered properly.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials were provided.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Public()
  @Post('login')
  async login(@Body() loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.loginUsecase.execute(loginRequest);
  }

  // Forgot Password Endpoint
  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Initiate the forgot password process for a user.' })
  @ApiBody({ type: ForgotPasswordRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Forgot password process initiated successfully.',
  })
  async forgotPassword(@Body() forgotPasswordRequestDto: ForgotPasswordRequestDto) {
    await this.forgotPasswordUseCase.execute(forgotPasswordRequestDto);
    return { message: 'If your email exists, a password reset link has been sent.' };
  }

  // Reset Password Endpoint
  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using a valid reset token.' })
  @ApiQuery({ name: 'token', required: true, description: 'Reset token from email link' })
  @ApiBody({ type: ResetPasswordRequestDTO })
  async resetPassword(@Query('token') token: string, @Body() body: ResetPasswordRequestDTO): Promise<void> {
    await this.resetPasswordUseCase.execute({ token, newPassword: body.newPassword });
  }
}
