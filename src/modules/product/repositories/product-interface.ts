import { CreatedProductDTO } from '../dto/product.dto';

export abstract class IProductRepository {
  abstract findAll(): Promise<CreatedProductDTO[]>;
}
