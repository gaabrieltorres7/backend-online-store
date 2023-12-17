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

  async findById(id: number): Promise<CreatedProductDTO | null> {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  async delete(id: number): Promise<boolean> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      return true;
    }
    return false;
  }
}
