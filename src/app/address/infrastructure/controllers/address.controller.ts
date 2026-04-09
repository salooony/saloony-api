import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UpsertUserAddressUsecase } from '@address/application/usecases/upsert-user-address.usecase';
import { UpsertAddressRequestDto } from '@address/application/dtos/requests/upsert-address.request.dto';
import { AddressResponseDto } from '@address/application/dtos/responses/address.response.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
export class AddressController {
  constructor(private readonly upsertUserAddressUsecase: UpsertUserAddressUsecase) {}

  @Put(':id/address')
  @ApiOperation({ summary: 'Create or update user address' })
  @ApiResponse({ status: 201, type: AddressResponseDto, description: 'Address created' })
  @ApiResponse({ status: 204, description: 'Address updated' })
  @ApiResponse({ status: 404, description: 'User or address not found' })
  async upsertAddress(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: UpsertAddressRequestDto,
    @Res() res: Response,
  ) {
    const result = await this.upsertUserAddressUsecase.execute(userId, dto);

    if (result.status === 201) {
      return res.status(201).json(result.data);
    }

    return res.status(204).send();
  }
}
