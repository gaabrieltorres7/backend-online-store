import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/db/prisma.service';
import { CacheModule } from '../cache/cache.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityPrismaRepository } from './repositories/prisma/city-prisma-repository';

@Module({
  imports: [CacheModule],
  controllers: [CityController],
  providers: [PrismaService, CityService, CityPrismaRepository],
})
export class CityModule {}
