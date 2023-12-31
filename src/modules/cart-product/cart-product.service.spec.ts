import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICartRepository } from '../cart/repositories/cart-interface';
import { CartInMemoryRepository } from '../cart/repositories/in-memory/cart-in-memory.repository';
import { CategoryService } from '../category/category.service';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryInMemoryRepository } from '../category/repositories/in-memory/category-in-memory.repository';
import { ProductService } from '../product/product.service';
import { ProductInMemoryRepository } from '../product/repositories/in-memory/product-in-memory.repository';
import { IProductRepository } from '../product/repositories/product-interface';
import { CartProductService } from './cart-product.service';
import { ICartProductRepository } from './repositories/cart-product-interface';
import { CartProductInMemoryRepository } from './repositories/in-memory/cart-product-in-memory.repository';

const CATEGORY_MOCK = {
  name: 'Category 1',
};

describe('CartProductService', () => {
  let sut: CartProductService;
  let cartProductService: CartProductService;
  let productService: ProductService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        CartProductService,
        CategoryService,
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

  it('should be able to delete a product in a cart', async () => {
    const category = await categoryService.create(CATEGORY_MOCK);
    const product = await productService.create({
      name: 'Product 1',
      image: 'image.png',
      price: 100,
      categoryId: category.id,
    });

    await sut.createProductToCart({ productId: product.id, amount: 50 }, 1);
    const deleteResult = await sut.deleteProductCart(product.id, 1);

    expect(deleteResult).toBe(
      JSON.stringify({
        message: `The product ID ${product.id} has been deleted successfully`,
      }),
    );
  });

  it('should not be able to delete a product in a cart if the product does not exist', async () => {
    await expect(sut.deleteProductCart(2, 1)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should be able to create a product in a cart', async () => {
    const category = await categoryService.create(CATEGORY_MOCK);
    const product = await productService.create({
      name: 'Product 1',
      image: 'image.png',
      price: 100,
      categoryId: category.id,
    });

    const cartProduct = await sut.createProductToCart(
      { productId: product.id, amount: 50 },
      1,
    );

    expect(cartProduct).toMatchObject({
      id: 1,
      cartId: 1,
      productId: product.id,
      amount: 50,
    });
  });

  it('should be able to return a product in a cart', async () => {
    const category = await categoryService.create(CATEGORY_MOCK);
    const product = await productService.create({
      name: 'Product 1',
      image: 'image.png',
      price: 100,
      categoryId: category.id,
    });

    await sut.createProductToCart({ productId: product.id, amount: 50 }, 1);
    const cartProduct = await sut.verifyProductToCart(product.id, 1);

    expect(cartProduct).toMatchObject({
      id: 1,
      cartId: 1,
      productId: product.id,
      amount: 50,
    });
  });

  it('should not be able to return a product in a cart if the product does not exist', async () => {
    await expect(sut.verifyProductToCart(2, 1)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should be able to insert a product in a cart', async () => {
    const category = await categoryService.create(CATEGORY_MOCK);
    const product = await productService.create({
      name: 'Product 1',
      image: 'image.png',
      price: 100,
      categoryId: category.id,
    });

    const cartProduct = await sut.insertProductToCart(
      { productId: product.id, amount: 50 },
      { id: 1, userId: 1 },
    );

    expect(cartProduct).toMatchObject({
      id: 1,
      cartId: 1,
      productId: product.id,
      amount: 50,
    });
  });

  it('should not be able to insert a product in a cart if the product does not exist', async () => {
    await expect(
      sut.insertProductToCart(
        { productId: 2, amount: 50 },
        { id: 1, userId: 1 },
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should be able to update a product in a cart', async () => {
    const category = await categoryService.create(CATEGORY_MOCK);
    const product = await productService.create({
      name: 'Product 1',
      image: 'image.png',
      price: 100,
      categoryId: category.id,
    });

    await sut.createProductToCart({ productId: product.id, amount: 50 }, 1);
    const cartProduct = await sut.updateProductInCart(
      { productId: product.id, amount: 100 },
      { id: 1, userId: 1 },
    );

    expect(cartProduct).toMatchObject({
      id: 1,
      cartId: 1,
      productId: product.id,
      amount: 100,
    });
  });

  it('should not be able to update a product in a cart if the product does not exist', async () => {
    await expect(
      sut.updateProductInCart(
        { productId: 2, amount: 100 },
        { id: 1, userId: 1 },
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able to update a product in a cart if the cart does not exist', async () => {
    const category = await categoryService.create(CATEGORY_MOCK);
    const product = await productService.create({
      name: 'Product 1',
      image: 'image.png',
      price: 100,
      categoryId: category.id,
    });

    await expect(
      sut.updateProductInCart(
        { productId: product.id, amount: 100 },
        { id: 2, userId: 1 },
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
