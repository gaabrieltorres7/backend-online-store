import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache/cache.service';
import { CityService } from './city.service';
import { ICityRepository } from './repositories/city-interface';
import { CityInMemoryRepository } from './repositories/in-memory/city-in-memory.repository';

const CITY_SP = {
  id: 1,
  name: 'São Paulo',
  stateId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CITY_SANTOS = {
  id: 2,
  name: 'Santos',
  stateId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CITY_RECIFE = {
  id: 3,
  name: 'Recife',
  stateId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cities = [CITY_SP, CITY_SANTOS, CITY_RECIFE];

describe('CityService', () => {
  let sut: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: ICityRepository,
          useClass: CityInMemoryRepository,
        },
        {
          provide: CacheService,
          useValue: { getCache: jest.fn().mockResolvedValue(cities) },
        },
      ],
    }).compile();

    sut = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to return all cities by state id', async () => {
    const result = await sut.getAllCitiesByStateId(1);
    expect(result).toMatchObject(cities);
  });

  it('should be able to return a city by id', async () => {
    const result = await sut.findCityById(1);

    expect(result?.name).toEqual('São Paulo');
  });

  it('should not be able to return a city by id if it not exists', async () => {
    await expect(sut.findCityById(4)).rejects.toBeInstanceOf(HttpException);
  });
});
