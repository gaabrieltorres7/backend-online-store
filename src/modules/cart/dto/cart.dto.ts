export type InsertProductToCartDTO = {
  productId: number;
  amount: number;
};

export type CreatedCartDTO = {
  id: number;
  userId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatedCartProductDTO = {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
};
