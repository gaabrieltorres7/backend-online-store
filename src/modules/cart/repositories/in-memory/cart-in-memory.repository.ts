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
  async getCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CreatedCartDTO | null> {
    if (!isRelations) {
      const cart = this.carts.find((cart) => cart.userId === userId);
      return cart || null;
    }

    const cart = this.carts.find((cart) => cart.userId === userId);

    if (!cart) {
      return null;
    }

    const cartProduct = {
      id: 1,
      cartId: cart.id,
      productId: 1,
      amount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    cart.cartProducts = [cartProduct];

    return cart;
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

  async clearCart(userId: number): Promise<string> {
    const updatedCart = this.carts.filter((cart) => cart.userId === userId);

    updatedCart[0].isActive = false;

    return JSON.stringify({
      message: `The cart ${updatedCart[0]?.id} has been cleaned`,
    });
  }
}
