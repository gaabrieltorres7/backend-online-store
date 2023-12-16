import { CreatedProductDTO } from '../../dto/product.dto';
import { IProductRepository } from '../product-interface';

export class ProductInMemoryRepository implements IProductRepository {
  private products: CreatedProductDTO[] = [];

  async findAll(): Promise<CreatedProductDTO[]> {
    return this.products;
  }

  async create(product: CreatedProductDTO): Promise<CreatedProductDTO> {
    this.products.push(product);
    return product;
  }
}
