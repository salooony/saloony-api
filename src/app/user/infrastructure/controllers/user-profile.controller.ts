import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { GetUserUseCase } from '../../application/usecases/get-user.usecase';
import { UserProfileResponseDto } from '../../application/dtos/responses/user-profile.response.dto';

@ApiTags('User Profile')
@ApiBearerAuth()
@Controller('user/profile')
export class UserProfileController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @UseGuards(TokenGuard)
  @Get()
  @ApiOkResponse({
    description: 'Get logged-in user profile',
    type: UserProfileResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getProfile(@Req() req: { user: { id: string } }): Promise<UserProfileResponseDto> {
    const user = await this.getUserUseCase.execute(req.user.id);
    return UserProfileResponseDto.fromUser(user);
  }
}
