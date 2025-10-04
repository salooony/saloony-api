import { Public } from '@app/user/application/decorators/public.decorator';
import { LoginRequestDto } from '@app/user/application/dtos/requests/login.request.dto';
import { LoginResponseDto } from '@app/user/application/dtos/responses/login.response.dto';
import { LoginUsecase } from '@app/user/application/usecases/login.usecase';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

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
}
