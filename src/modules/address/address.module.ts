import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/db/prisma.service';
import { CacheModule } from '../cache/cache.module';
import { CityService } from '../city/city.service';
import { ICityRepository } from '../city/repositories/city-interface';
import { CityPrismaRepository } from '../city/repositories/prisma/city-prisma-repository';
import { UserPrismaRepository } from '../user/repositories/prisma/user-prisma-repository';
import { IUserRepository } from '../user/repositories/user-interface';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressPrismaRepository } from './repositories/prisma/address-prisma-repository';

@Module({
  imports: [CacheModule, UserModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressPrismaRepository,
    PrismaService,
    UserService,
    CityService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: ICityRepository,
      useClass: CityPrismaRepository,
    },
  ],
})
export class AddressModule {}
