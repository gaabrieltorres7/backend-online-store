import {
  CreatedCartDTO,
  CreatedCartProductDTO,
  InsertProductToCartDTO,
} from '../../dto/cart.dto';
import { ICartRepository } from '../cart-interface';

export class CartInMemoryRepository implements ICartRepository {
  private carts: CreatedCartDTO[] = [];

  async createCart(userId: number): Promise<CreatedCartDTO> {
    const cart = {
      id: 1,
      userId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.carts.push(cart);

    return cart;
  }
  async getCartByUserId(userId: number): Promise<CreatedCartDTO | null> {
    const cart = this.carts.find((cart) => cart.userId === userId);

    return cart || null;
  }
  async insertProductToCart(
    data: InsertProductToCartDTO,
    userId: number,
  ): Promise<CreatedCartProductDTO | null> {
    const cart = await this.getCartByUserId(userId);

    if (!cart) {
      return null;
    }

    const cartProduct = {
      id: 1,
      cartId: cart.id,
      productId: data.productId,
      amount: data.amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return cartProduct;
  }
}
