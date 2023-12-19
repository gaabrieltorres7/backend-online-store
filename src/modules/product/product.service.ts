import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { IProductRepository } from './repositories/product-interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll() {
    const products = await this.productRepository.findAll();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async create(data: CreateProductDTO) {
    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = await this.productRepository.create(data);

    return product;
  }

  async findById(id: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async delete(id: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(id);

    return true;
  }

  async update(id: number, data: UpdateProductDTO) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productRepository.update(id, data);

    return updatedProduct;
  }
}
