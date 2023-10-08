import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityPrismaRepository } from './repositories/prisma/city-prisma-repository';

@Module({
  imports: [
    CacheModule.register({
      ttl: 999999999999999, //seconds
    }),
  ],
  controllers: [CityController],
  providers: [PrismaService, CityService, CityPrismaRepository],
})
export class CityModule {}
