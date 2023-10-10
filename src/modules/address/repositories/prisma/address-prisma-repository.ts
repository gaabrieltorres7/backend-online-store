import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CreateAddressDTO, CreatedAddressDTO } from '../../dto/address.dto';
import { IAddressRepository } from '../address-interface';

@Injectable()
export class AddressPrismaRepository implements IAddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAddressDTO): Promise<CreatedAddressDTO | null> {
    //TODO: validate if city exists and validate if user exists
    const address = await this.prisma.address.create({ data });
    return address;
  }
}
