import {
  CreateProductDTO,
  CreatedProductDTO,
  UpdateProductDTO,
} from '../dto/product.dto';

export abstract class IProductRepository {
  abstract findAll(): Promise<CreatedProductDTO[]>;
  abstract create(data: CreateProductDTO): Promise<CreatedProductDTO>;
  abstract findById(id: number): Promise<CreatedProductDTO | null>;
  abstract delete(id: number): Promise<boolean>;
  abstract update(
    id: number,
    data: UpdateProductDTO,
  ): Promise<CreatedProductDTO | null>;
}
