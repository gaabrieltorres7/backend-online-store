import { Injectable } from '@nestjs/common';
import {
  CreatedCartProductDTO,
  InsertProductToCartDTO,
} from 'src/modules/cart/dto/cart.dto';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { ICartProductRepository } from '../cart-product-interface';

@Injectable()
export class CartProductPrismaRepository implements ICartProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProductToCart(
    data: InsertProductToCartDTO,
    cartId: number,
  ): Promise<CreatedCartProductDTO> {
    const cartProduct = await this.prisma.cartProduct.create({
      data: {
        amount: data.amount,
        productId: data.productId,
        cartId,
      },
    });

    return cartProduct;
  }

  async updateProductAmount(
    cartProductId: number,
    amount: number,
  ): Promise<CreatedCartProductDTO> {
    const cartProduct = await this.prisma.cartProduct.update({
      where: {
        id: cartProductId,
      },
      data: {
        amount,
      },
    });

    return cartProduct;
  }

  async verifyProductToCart(productId: number, cartId: number) {
    const cartProduct = await this.prisma.cartProduct.findFirst({
      where: {
        productId,
        cartId,
      },
    });

    return cartProduct;
  }
}
