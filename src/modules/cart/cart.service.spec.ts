import { NotFoundException } from '@nestjs/common';
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

  it('should be able to create a cart', async () => {
    const cart = await sut.createCart(1);
    expect(cart).toHaveProperty('id');
    expect(cart.isActive).toBe(true);
  });

  it('should be able to clear a cart', async () => {
    const cart = await sut.createCart(1);
    await sut.clearCart(1);
    expect(cart.isActive).toBe(false);
  });

  it('should not be able to clear a cart if it does not exist', async () => {
    await expect(sut.clearCart(1)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should be able to get a cart by user id without relations', async () => {
    await sut.createCart(1);
    const cart = await sut.getCartByUserId(1);
    expect(cart).toHaveProperty('id');
    expect(cart.isActive).toBe(true);
    expect(cart.cartProducts).toBeUndefined();
  });

  it('should be able to get a cart by user id with relations', async () => {
    const category = await categoryService.create({ name: 'any_name' });
    const product = await productService.create({
      categoryId: category.id,
      name: 'any_name',
      price: 1,
      image: 'any_image',
    });
    await sut.createCart(1);
    await sut.insertProductToCart({ productId: product.id, amount: 1 }, 1);
    const cart = await sut.getCartByUserId(1, true);
    expect(cart.cartProducts).toHaveLength(1);
    expect(cart.cartProducts).toBeDefined();
    expect(cart.cartProducts).toMatchObject([
      {
        amount: 1,
        cartId: 1,
        id: 1,
        productId: 1,
      },
    ]);
  });

  it('should not be able to get a cart by user id if it does not exist', async () => {
    await expect(sut.getCartByUserId(1)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should be able to insert a product to a cart', async () => {
    const category = await categoryService.create({ name: 'any_name' });
    const product = await productService.create({
      categoryId: category.id,
      name: 'any_name',
      price: 1,
      image: 'any_image',
    });
    await sut.createCart(1);
    const cart = await sut.insertProductToCart(
      { productId: product.id, amount: 1 },
      1,
    );
    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('cartProducts');
  });

  it('should be able to create a cart and insert a product to it if the cart does not exist', async () => {
    const category = await categoryService.create({ name: 'any_name' });
    const product = await productService.create({
      categoryId: category.id,
      name: 'any_name',
      price: 1,
      image: 'any_image',
    });

    const cart = await sut.insertProductToCart(
      { productId: product.id, amount: 1 },
      1,
    );

    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('cartProducts');
  });

  it('should be able to delete a product in a cart', async () => {
    const category = await categoryService.create({ name: 'any_name' });
    const product = await productService.create({
      categoryId: category.id,
      name: 'any_name',
      price: 1,
      image: 'any_image',
    });
    await sut.createCart(1);
    await sut.insertProductToCart({ productId: product.id, amount: 1 }, 1);
    const deletedCart = await sut.deleteProductInCart(product.id, 1);
    expect(deletedCart).toEqual(
      JSON.stringify({
        message: `The product ID ${product.id} has been deleted successfully`,
      }),
    );
  });

  it('should not be able to delete a product in a cart if the product does not exist', async () => {
    await expect(sut.deleteProductInCart(1, 1)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should be able to update a product in a cart', async () => {
    const category = await categoryService.create({ name: 'any_name' });
    const product = await productService.create({
      categoryId: category.id,
      name: 'any_name',
      price: 1,
      image: 'any_image',
    });
    await sut.createCart(1);
    await sut.insertProductToCart({ productId: product.id, amount: 1 }, 1);
    const updatedCart = await sut.updateProductToCart(
      { productId: product.id, amount: 2 },
      1,
    );
    expect(updatedCart).toHaveProperty('id');
    expect(updatedCart.amount).toEqual(2);
  });
});
