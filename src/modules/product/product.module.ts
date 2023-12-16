import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CategoryService } from '../category/category.service';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryPrismaRepository } from '../category/repositories/prisma/category-prisma-repository';
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
    CategoryService,
    { provide: ICategoryRepository, useClass: CategoryPrismaRepository },
    { provide: IProductRepository, useClass: ProductPrismaRepository },
  ],
})
export class ProductModule {}
