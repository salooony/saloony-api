import { IAddressRepository } from '@app/shared/address/domain/ports/iaddress.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address as AddressEntity } from '../schemas/address.entity';
import { Address } from '@app/shared/address/domain/entities/address';
import { AddressMapper } from '../mappers/address.mapper';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private repository: Repository<AddressEntity>,
  ) {}

  async save(address: Address): Promise<Address> {
    const savedAddress = await this.repository.save(AddressMapper.toEntity(address));

    return AddressMapper.map(savedAddress);
  }

  async findOneById(id: string): Promise<Address | null> {
    const address = await this.repository.findOne({ where: { id } });

    if (!address) return null;

    return AddressMapper.map(address);
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.repository.find();

    return addresses.map((address) => AddressMapper.map(address));
  }
}
