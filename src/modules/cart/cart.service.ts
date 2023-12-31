import { Injectable, NotFoundException } from '@nestjs/common';
import { CartProductService } from '../cart-product/cart-product.service';
import { InsertProductToCartDTO, UpdateCartDTO } from './dto/cart.dto';
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

  async clearCart(userId: number) {
    try {
      await this.cartRepository.clearCart(userId);
    } catch (err) {
      throw new NotFoundException('Cart not found');
    }
  }

  async getCartByUserId(userId: number, isRelations?: boolean) {
    const cart = await this.cartRepository.getCartByUserId(userId, isRelations);

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

    return this.getCartByUserId(userId, true);
  }

  async updateProductToCart(updateCartDTO: UpdateCartDTO, userId: number) {
    const cart = await this.getCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    return await this.cartProductService.updateProductInCart(
      updateCartDTO,
      cart,
    );
  }

  async deleteProductInCart(productId: number, userId: number) {
    const cart = await this.getCartByUserId(userId, true);

    return await this.cartProductService.deleteProductCart(productId, cart.id);
  }
}
