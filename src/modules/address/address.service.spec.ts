import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache/cache.service';
import { CityService } from '../city/city.service';
import { ICityRepository } from '../city/repositories/city-interface';
import { CityInMemoryRepository } from '../city/repositories/in-memory/city-in-memory.repository';
import { UserInMemoryRepository } from '../user/repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from '../user/repositories/user-interface';
import { UserService } from '../user/user.service';
import { AddressService } from './address.service';
import { IAddressRepository } from './repositories/address-interface';
import { AddressInMemoryRepository } from './repositories/in-memory/address-in-memory.repository';

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

const address = {
  complement: 'test',
  numberAddress: 1,
  cep: 'test',
  cityId: 1,
  userId: 1,
};

describe('AddressService', () => {
  let sut: AddressService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        CacheService,
        {
          provide: IUserRepository,
          useValue: UserInMemoryRepository,
        },
        {
          provide: IAddressRepository,
          useClass: AddressInMemoryRepository,
        },
        {
          provide: ICityRepository,
          useValue: CityInMemoryRepository,
        },
        {
          provide: CacheService,
          useValue: { getCache: jest.fn().mockResolvedValue(cities) },
        },
        {
          provide: UserService,
          useValue: { findUserById: jest.fn().mockResolvedValue(address) },
        },
        {
          provide: CityService,
          useValue: { findCityById: jest.fn().mockResolvedValue(cities) },
        },
      ],
    }).compile();

    sut = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to create an address', async () => {
    const result = await sut.create(address);
    expect(result).toHaveProperty('id');
  });
});
