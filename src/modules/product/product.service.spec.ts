import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category/category.service';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryInMemoryRepository } from '../category/repositories/in-memory/category-in-memory.repository';
import { ProductService } from './product.service';
import { ProductInMemoryRepository } from './repositories/in-memory/product-in-memory.repository';
import { IProductRepository } from './repositories/product-interface';

describe('ProductService', () => {
  let sut: ProductService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        CategoryService,
        {
          provide: IProductRepository,
          useClass: ProductInMemoryRepository,
        },
        {
          provide: ICategoryRepository,
          useClass: CategoryInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should be able to return all products', async () => {
    const category = await categoryService.create({ name: 'Category 1' });
    await sut.create({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
    const products = await sut.findAll();
    expect(products).toEqual([
      {
        categoryId: category.id,
        name: 'Product 1',
        price: 10,
        image: 'image',
      },
    ]);
  });

  it('should be able to throw an error if there is no product', () => {
    expect(sut.findAll()).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should be able to create a product', async () => {
    const category = await categoryService.create({ name: 'Category 1' });
    const product = await sut.create({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
    expect(product).toEqual({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
  });

  it('should not be able to create a product if you use an invalid category', () => {
    expect(
      sut.create({
        categoryId: 1234,
        name: 'Product 1',
        price: 10,
        image: 'image',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should be able to return a product by id', async () => {
    const category = await categoryService.create({ name: 'Category 1' });
    const product = await sut.create({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
    const productById = await sut.findById(product.id);
    expect(productById).toEqual({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
  });

  it('should not be able to return a product if you use an invalid id', () => {
    expect(sut.findById(1234)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should be able to delete a product', async () => {
    const category = await categoryService.create({ name: 'Category 1' });
    const product = await sut.create({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
    const productDeleted = await sut.delete(product.id);
    expect(productDeleted).toBe(true);
  });

  it('should not be able to delete a product if you use an invalid id', () => {
    expect(sut.delete(1234)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should be able to update a product', async () => {
    const category = await categoryService.create({ name: 'Category 1' });
    const product = await sut.create({
      categoryId: category.id,
      name: 'Product 1',
      price: 10,
      image: 'image',
    });
    const productUpdated = await sut.update(product.id, {
      name: 'Product 2',
      price: 20,
      image: 'image2',
    });
    expect(productUpdated).toEqual({
      categoryId: category.id,
      name: 'Product 2',
      price: 20,
      image: 'image2',
    });
  });

  it('should not be able to update a product if the product does not exist', () => {
    expect(
      sut.update(1234, {
        name: 'Product 2',
        price: 20,
        image: 'image2',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
