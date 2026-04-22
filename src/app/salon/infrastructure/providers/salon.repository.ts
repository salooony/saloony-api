import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salon as SalonSchema } from '@salon/infrastructure/schemas/salon.entity';
import { ISalonRepository } from '@salon/domain/ports/isalon.repository';

/**
 * Concrete implementation of salon persistence using TypeORM.
 */
@Injectable()
export class SalonRepository implements ISalonRepository {
  readonly type = 'SalonRepository';

  constructor(@InjectRepository(SalonSchema) private readonly repository: Repository<SalonSchema>) {}
}
