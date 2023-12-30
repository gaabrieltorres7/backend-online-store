import { Test, TestingModule } from '@nestjs/testing';
import { ICartRepository } from '../cart/repositories/cart-interface';
import { CartInMemoryRepository } from '../cart/repositories/in-memory/cart-in-memory.repository';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryInMemoryRepository } from '../category/repositories/in-memory/category-in-memory.repository';
import { ProductService } from '../product/product.service';
import { ProductInMemoryRepository } from '../product/repositories/in-memory/product-in-memory.repository';
import { IProductRepository } from '../product/repositories/product-interface';
import { CartProductService } from './cart-product.service';
import { ICartProductRepository } from './repositories/cart-product-interface';
import { CartProductInMemoryRepository } from './repositories/in-memory/cart-product-in-memory.repository';

describe('CartProductService', () => {
  let sut: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        CartProductService,
        {
          provide: ICartRepository,
          useClass: CartInMemoryRepository,
        },
        {
          provide: ICartProductRepository,
          useClass: CartProductInMemoryRepository,
        },
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

    sut = module.get<CartProductService>(CartProductService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
