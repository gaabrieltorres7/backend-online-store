import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductInMemoryRepository } from './repositories/in-memory/product-in-memory.repository';
import { IProductRepository } from './repositories/product-interface';

describe('ProductService', () => {
  let sut: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: IProductRepository,
          useClass: ProductInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  // it('should be able to return all products', () => {
  //   const products = sut.findAll();
  //   expect(products).toHaveLength(0);
  // });

  it('should be able to throw an error if there is no product', () => {
    expect(sut.findAll()).rejects.toBeInstanceOf(NotFoundException);
  });
});
