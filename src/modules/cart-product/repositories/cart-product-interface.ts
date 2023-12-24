import {
  CreatedCartProductDTO,
  InsertProductToCartDTO,
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
}
