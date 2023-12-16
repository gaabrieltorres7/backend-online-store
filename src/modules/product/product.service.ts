import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from './repositories/product-interface';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async findAll() {
    const products = await this.productRepository.findAll();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }
}
