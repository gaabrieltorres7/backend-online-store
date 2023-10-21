import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { CityDTO } from './dto/city.dto';
import { ICityRepository } from './repositories/city-interface';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: ICityRepository,
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

  async findCityById(id: number): Promise<CityDTO | null> {
    const city = await this.cityRepository.findCityById(id);
    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    return city;
  }
}
