import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Salon')
@Controller('salons')
export class SalonController {}
