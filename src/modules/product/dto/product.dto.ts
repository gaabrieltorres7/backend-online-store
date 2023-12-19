export type CreateProductDTO = {
  categoryId: number;
  name: string;
  price: number;
  image: string;
};

export type CreatedProductDTO = {
  id: number;
} & CreateProductDTO;

export type UpdateProductDTO = {
  categoryId?: number;
  name?: string;
  price?: number;
  image?: string;
};
