import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { UserType } from '../user/enum/user-type.enum';
import { CacheService } from './cache.service';

const USER_JOHN = {
  cpf: '00000000000',
  createdAt: new Date(),
  email: 'teste@email.com',
  id: 1,
  name: 'John Doe',
  password: '123456',
  phone: '00000000000',
  typeUser: UserType.User,
};

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => USER_JOHN,
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to return data in cache', async () => {
    const user = await service.getCache('key', () =>
      Promise.resolve(USER_JOHN),
    );

    expect(user).toEqual(USER_JOHN);
  });

  it('should be able to return data in function', async () => {
    const result = { test: 'tes' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

    const user = await service.getCache('key', () => Promise.resolve(result));

    expect(user).toEqual(result);
  });
});
