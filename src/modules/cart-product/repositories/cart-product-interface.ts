import {
  CreatedCartDTO,
  CreatedCartProductDTO,
  InsertProductToCartDTO,
  UpdateCartDTO,
} from 'src/modules/cart/dto/cart.dto';

export abstract class ICartProductRepository {
  abstract createProductToCart(
    data: InsertProductToCartDTO,
    cartId: number,
  ): Promise<CreatedCartProductDTO>;
  abstract updateProductAmount(
    cartProductId: number,
    amount: number,
  ): Promise<CreatedCartProductDTO>;
  abstract verifyProductToCart(
    productId: number,
    cartId: number,
  ): Promise<CreatedCartProductDTO | null>;

  abstract updateProductToCart(
    updateCartDTO: UpdateCartDTO,
    cart: CreatedCartDTO,
  ): Promise<CreatedCartDTO>;

  abstract deleteProductInCart(
    productId: number,
    cartId: number,
  ): Promise<string>;
}
