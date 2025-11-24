import { Public } from '@user/application/decorators/public.decorator';
import { LoginRequestDto } from '@user/application/dtos/requests/login.request.dto';
import { LoginResponseDto } from '@user/application/dtos/responses/login.response.dto';
import { LoginUsecase } from '@user/application/usecases/login.usecase';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordRequestDto } from '@user/application/dtos/requests/forgot-password.request.dto';
import { ForgotPasswordUseCase } from '@user/application/usecases/forgot-password.usecase';
import { ResetPasswordRequestDTO } from '@user/application/dtos/requests/reset-password.request.dto';
import { ResetPasswordUseCase } from '@user/application/usecases/reset-password.usecase';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
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
  @ApiBody({ type: ResetPasswordRequestDTO })
  async resetPassword(@Body() body: ResetPasswordRequestDTO) {
    await this.resetPasswordUseCase.execute(body);
    return { message: 'Password has been reset successfully.' };
  }
}
