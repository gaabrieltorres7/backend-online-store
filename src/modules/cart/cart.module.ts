import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CartProductService } from '../cart-product/cart-product.service';
import { ICartProductRepository } from '../cart-product/repositories/cart-product-interface';
import { CartProductPrismaRepository } from '../cart-product/repositories/prisma/cart-product-prisma-repository';
import { ICategoryRepository } from '../category/repositories/category-interface';
import { CategoryPrismaRepository } from '../category/repositories/prisma/category-prisma-repository';
import { ProductService } from '../product/product.service';
import { ProductPrismaRepository } from '../product/repositories/prisma/product-prisma-repository';
import { IProductRepository } from '../product/repositories/product-interface';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ICartRepository } from './repositories/cart-interface';
import { CartPrismaRepository } from './repositories/prisma/cart-prisma-repository';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    CartProductService,
    ProductService,
    { provide: ICategoryRepository, useClass: CategoryPrismaRepository },
    { provide: IProductRepository, useClass: ProductPrismaRepository },
    { provide: ICartRepository, useClass: CartPrismaRepository },
    { provide: ICartProductRepository, useClass: CartProductPrismaRepository },
  ],
})
export class CartModule {}
