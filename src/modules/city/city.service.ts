import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CityDTO } from './dto/city.dto';
import { CityPrismaRepository } from './repositories/prisma/city-prisma-repository';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityPrismaRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllCitiesByStateId(stateId: number) {
    const citiesCache: CityDTO[] = await this.cacheManager.get(
      `state_${stateId}`,
    );
    if (citiesCache) {
      return citiesCache;
    }

    const cities = await this.cityRepository.getAllCitiesByStateId(stateId);

    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
