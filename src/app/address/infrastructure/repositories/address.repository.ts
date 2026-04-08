import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address as AddressSchema } from '../schemas/address.schema';
import { IAddressRepository } from '@address/domain/ports/iaddress.repository';
import { Address } from '@address/domain/entities/address.entity';
import { AddressMapper } from '../mappers/address.mapper';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(@InjectRepository(AddressSchema) private readonly repository: Repository<AddressSchema>) {}

  async create(address: Address): Promise<Address> {
    return this.saveAddress(address);
  }

  async update(address: Address): Promise<Address> {
    return this.saveAddress(address);
  }

  async findById(id: string): Promise<Address | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? AddressMapper.toDomain(entity) : null;
  }

  private async saveAddress(address: Address): Promise<Address> {
    const entity = AddressMapper.toEntity(address);
    const saved = await this.repository.save(entity);
    return AddressMapper.toDomain(saved);
  }
}
