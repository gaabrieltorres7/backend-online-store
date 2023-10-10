import { Injectable } from '@nestjs/common';
import { CreateAddressDTO, CreatedAddressDTO } from './dto/address.dto';
import { AddressPrismaRepository } from './repositories/prisma/address-prisma-repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressPrismaRepository) {}

  async create(data: CreateAddressDTO): Promise<CreatedAddressDTO | null> {
    return await this.addressRepository.create(data);
  }
}
