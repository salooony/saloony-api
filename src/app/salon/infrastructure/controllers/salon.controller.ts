import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/**
 * SalonController
 */
@ApiTags('Salon')
@Controller('salons')
export class SalonController {}
