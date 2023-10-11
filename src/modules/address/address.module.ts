import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CacheModule } from '../cache/cache.module';
import { CityService } from '../city/city.service';
import { CityPrismaRepository } from '../city/repositories/prisma/city-prisma-repository';
import { UserPrismaRepository } from '../user/repositories/prisma/user-prisma-repository';
import { UserService } from '../user/user.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressPrismaRepository } from './repositories/prisma/address-prisma-repository';

@Module({
  imports: [CacheModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressPrismaRepository,
    PrismaService,
    UserService,
    UserPrismaRepository,
    CityService,
    CityPrismaRepository,
  ],
})
export class AddressModule {}
