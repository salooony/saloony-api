import { CurrentUser } from '@app/user/application/decorators/current-user.decorator';
import { Public } from '@app/user/application/decorators/public.decorator';
import { UserRequestDto } from '@app/user/application/dtos/requests/user.request.dto';
import { UserResponseDto } from '@app/user/application/dtos/responses/user.response.dto';
import { CreateUserUsecase } from '@app/user/application/usecases/create.usecase';
import { DeleteUserAccountUseCase } from '@app/user/application/usecases/delete-user-account.usecase';
import { GetUserInfoUsecase } from '@app/user/application/usecases/get-user-info.usecase';
import { User } from '@app/user/domain/entities/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly getUserInfoUsecase: GetUserInfoUsecase,
    private readonly deleteUserUseCase: DeleteUserAccountUseCase,
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
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') userId: string): Promise<void> {
    await this.deleteUserUseCase.execute(userId);
  }
}
