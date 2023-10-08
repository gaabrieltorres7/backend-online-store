import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { CityDTO } from './dto/city.dto';
import { CityPrismaRepository } from './repositories/prisma/city-prisma-repository';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityPrismaRepository,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number) {
    return this.cacheService.getCache<CityDTO[]>(
      `state_${stateId}`,
      async () => {
        return await this.cityRepository.getAllCitiesByStateId(stateId);
      },
    );
  }
}
