import { CreateProductDTO, CreatedProductDTO } from '../dto/product.dto';

export abstract class IProductRepository {
  abstract findAll(): Promise<CreatedProductDTO[]>;
  abstract create(data: CreateProductDTO): Promise<CreatedProductDTO>;
}
