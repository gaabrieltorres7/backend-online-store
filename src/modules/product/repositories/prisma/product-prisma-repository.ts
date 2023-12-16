import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreatedProductDTO } from '../../dto/product.dto';
import { IProductRepository } from '../product-interface';

@Injectable()
export class ProductPrismaRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CreatedProductDTO[]> {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async create(data: CreatedProductDTO): Promise<CreatedProductDTO> {
    const createdProduct = await this.prisma.product.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        price: data.price,
        image: data.image,
      },
    });

    return createdProduct;
  }
}
