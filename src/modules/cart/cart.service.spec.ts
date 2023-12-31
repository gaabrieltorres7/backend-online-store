import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product/cart-product.service';
import { ICartProductRepository } from '../cart-product/repositories/cart-product-interface';
import { CartProductInMemoryRepository } from '../cart-product/repositories/in-memory/cart-product-in-memory.repository';
import { CategoryService } from '../category/category.service';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryInMemoryRepository } from '../category/repositories/in-memory/category-in-memory.repository';
import { ProductService } from '../product/product.service';
import { ProductInMemoryRepository } from '../product/repositories/in-memory/product-in-memory.repository';
import { IProductRepository } from '../product/repositories/product-interface';
import { CartService } from './cart.service';
import { ICartRepository } from './repositories/cart-interface';
import { CartInMemoryRepository } from './repositories/in-memory/cart-in-memory.repository';

describe('CartService', () => {
  let sut: CartService;
  let cartProductService: CartProductService;
  let productService: ProductService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        ProductService,
        CategoryService,
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

    sut = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(cartProductService).toBeDefined();
    expect(productService).toBeDefined();
    expect(categoryService).toBeDefined();
  });
});
