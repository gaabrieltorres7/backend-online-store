import { Injectable, NotFoundException } from '@nestjs/common';
import { CartProductService } from '../cart-product/cart-product.service';
import { InsertProductToCartDTO } from './dto/cart.dto';
import { ICartRepository } from './repositories/cart-interface';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: ICartRepository,
    private readonly cartProductService: CartProductService,
  ) {}

  async createCart(userId: number) {
    const cart = await this.cartRepository.createCart(userId);

    return cart;
  }

  async getCartByUserId(userId: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async insertProductToCart(data: InsertProductToCartDTO, userId: number) {
    const cart = await this.getCartByUserId(userId).catch(async () => {
      return await this.createCart(userId);
    });

    await this.cartProductService.insertProductToCart(data, cart);

    return cart;
  }
}
