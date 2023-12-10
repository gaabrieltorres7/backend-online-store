import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { ICategoryRepository } from './repositories/category-interface';
import { CategoryInMemoryRepository } from './repositories/in-memory/category-in-memory.repository';

describe('CategoryService', () => {
  let sut: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: ICategoryRepository,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to return all categories', async () => {
    const result = await sut.findAll();
    expect(result).toHaveLength(1);
  });

  it('should not be able to return all categories if not exists', async () => {
    const result = await sut.findAll();
    // await expect(result.slice(1)).rejects.toBeInstanceOf(NotFoundException); ///fix this when it has a create function
    expect(result.slice(1)).toEqual([]);
  });
});
