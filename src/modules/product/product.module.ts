import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPrismaRepository } from './repositories/prisma/product-prisma-repository';
import { IProductRepository } from './repositories/product-interface';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductService,
    { provide: IProductRepository, useClass: ProductPrismaRepository },
  ],
})
export class ProductModule {}
