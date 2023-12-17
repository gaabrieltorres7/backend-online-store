import { CreateProductDTO, CreatedProductDTO } from '../dto/product.dto';

export abstract class IProductRepository {
  abstract findAll(): Promise<CreatedProductDTO[]>;
  abstract create(data: CreateProductDTO): Promise<CreatedProductDTO>;
  abstract findById(id: number): Promise<CreatedProductDTO | null>;
  abstract delete(id: number): Promise<boolean>;
}
