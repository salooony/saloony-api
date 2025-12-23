import { CurrentUser } from '@app/user/application/decorators/current-user.decorator';
import { DeleteUserAccountUseCase } from '@app/user/application/usecases/delete-user-account.use-case';
import { User } from '@app/user/domain/entities/user';
import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserAccountController {
  constructor(private readonly deleteUserAccountUseCase: DeleteUserAccountUseCase) {}

  @ApiOperation({ summary: 'Delete/Deactivate user account' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Account was deactivated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User should be logged in.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong, try again.',
  })
  @Delete('/account')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(@CurrentUser() user: User): Promise<void> {
    await this.deleteUserAccountUseCase.execute(user.id);
  }
}

