import {
  CreatedCartDTO,
  CreatedCartProductDTO,
  InsertProductToCartDTO,
  UpdateCartDTO,
} from 'src/modules/cart/dto/cart.dto';
import { ICartProductRepository } from '../cart-product-interface';

export class CartProductInMemoryRepository implements ICartProductRepository {
  private cartProducts: CreatedCartProductDTO[] = [];

  async createProductToCart(
    data: InsertProductToCartDTO,
    cartId: number,
  ): Promise<CreatedCartProductDTO> {
    const cartProduct = {
      id: this.cartProducts.length + 1,
      cartId,
      productId: data.productId,
      amount: data.amount,
    } as CreatedCartProductDTO;

    this.cartProducts.push(cartProduct);

    return cartProduct;
  }
  async updateProductAmount(
    cartProductId: number,
    amount: number,
  ): Promise<CreatedCartProductDTO> {
    const cartProductIndex = this.cartProducts.findIndex(
      (cartProduct) => cartProduct.id === cartProductId,
    );

    this.cartProducts[cartProductIndex].amount = amount;

    return this.cartProducts[cartProductIndex];
  }
  async verifyProductToCart(
    productId: number,
    cartId: number,
  ): Promise<CreatedCartProductDTO | null> {
    const cartProduct = this.cartProducts.find(
      (cartProduct) =>
        cartProduct.productId === productId && cartProduct.cartId === cartId,
    );

    return cartProduct || null;
  }
  async updateProductToCart(
    updateCartDTO: UpdateCartDTO,
    cart: CreatedCartDTO,
  ): Promise<CreatedCartDTO> {
    const updatedCart = this.cartProducts.filter(
      (cartProduct) => cartProduct.cartId === cart.id,
    );

    updatedCart[0].amount = updateCartDTO.amount;

    return updatedCart[0];
  }
  async deleteProductInCart(
    productId: number,
    cartId: number,
  ): Promise<string> {
    this.cartProducts = this.cartProducts.filter(
      (cartProduct) =>
        cartProduct.productId !== productId && cartProduct.cartId !== cartId,
    );

    return 'Product deleted successfully';
  }
}
