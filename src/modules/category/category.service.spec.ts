import { HttpException } from '@nestjs/common';
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
    await sut.create({ name: 'Category 1' });
    const result = await sut.findAll();
    expect(result).toHaveLength(1);
  });

  it('should not be able to return all categories if not exists', async () => {
    expect(async () => await sut.findAll()).rejects.toBeInstanceOf(
      HttpException,
    );
  });

  it('should be able to return an error if category name already exists', async () => {
    await sut.create({ name: 'Category 1' });
    expect(sut.create({ name: 'Category 1' })).rejects.toBeInstanceOf(
      HttpException,
    );
  });

  it('should be able to create a category', async () => {
    const category = await sut.create({ name: 'Category 1' });

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual('Category 1');
  });

  it('should be able to return a category by name', async () => {
    await sut.create({ name: 'Category 1' });
    const category = await sut.findByName('Category 1');

    expect(category.name).toEqual('Category 1');
  });

  it('should not be able to return a category if it not exists', async () => {
    expect(sut.findByName('test')).rejects.toBeInstanceOf(HttpException);
  });
});
