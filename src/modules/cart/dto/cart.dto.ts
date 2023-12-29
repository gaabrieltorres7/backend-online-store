import { CreatedProductDTO } from 'src/modules/product/dto/product.dto';

export type InsertProductToCartDTO = {
  productId: number;
  amount: number;
};

export type CreatedCartDTO = {
  id: number;
  userId?: number;
  isActive?: boolean;
  cartProducts?: CreatedCartProductDTO[];
};

export type CreatedCartProductDTO = {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: CreatedProductDTO;
  cart?: CreatedCartDTO;
};

export type UpdateCartDTO = {
  productId: number;
  amount: number;
};
