import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreateAddressDTO, CreatedAddressDTO } from '../../dto/address.dto';
import { IAddressRepository } from '../address-interface';

@Injectable()
export class AddressPrismaRepository implements IAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAddressDTO): Promise<CreatedAddressDTO | null> {
    const address = await this.prisma.address.create({ data });
    return address;
  }

  async findAddressByUserId(userId: number): Promise<CreatedAddressDTO[]> {
    const addresses = await this.prisma.address.findMany({
      where: { userId },
    });
    return addresses;
  }
}
