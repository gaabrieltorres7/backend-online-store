import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressPrismaRepository } from './repositories/prisma/address-prisma-repository';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressPrismaRepository, PrismaService],
})
export class AddressModule {}
