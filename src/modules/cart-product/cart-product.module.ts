import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryPrismaRepository } from '../category/repositories/prisma/category-prisma-repository';
import { ProductService } from '../product/product.service';
import { ProductPrismaRepository } from '../product/repositories/prisma/product-prisma-repository';
import { IProductRepository } from '../product/repositories/product-interface';
import { CartProductService } from './cart-product.service';
import { ICartProductRepository } from './repositories/cart-product-interface';
import { CartProductPrismaRepository } from './repositories/prisma/cart-product-prisma-repository';

@Module({
  providers: [
    CartProductService,
    ProductService,
    PrismaService,
    { provide: ICategoryRepository, useClass: CategoryPrismaRepository },
    { provide: IProductRepository, useClass: ProductPrismaRepository },
    { provide: ICartProductRepository, useClass: CartProductPrismaRepository },
  ],
})
export class CartProductModule {}
