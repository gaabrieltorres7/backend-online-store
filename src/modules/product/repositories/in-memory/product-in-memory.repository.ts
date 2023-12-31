import {
  CreateProductDTO,
  CreatedProductDTO,
  UpdateProductDTO,
} from '../../dto/product.dto';
import { IProductRepository } from '../product-interface';

export class ProductInMemoryRepository implements IProductRepository {
  private products: CreatedProductDTO[] = [];

  async findAll(): Promise<CreatedProductDTO[]> {
    return this.products;
  }

  async create(data: CreateProductDTO): Promise<CreatedProductDTO> {
    const product: CreatedProductDTO = {
      id: 1 + this.products.length,
      ...data,
    };
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

  async update(
    id: number,
    data: UpdateProductDTO,
  ): Promise<CreatedProductDTO | null> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    const updatedProduct = {
      ...product,
      ...data,
    };

    this.products = this.products.map((product) =>
      product.id === id ? updatedProduct : product,
    );

    return updatedProduct;
  }
}
