import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreatedCartDTO } from '../../dto/cart.dto';
import { ICartRepository } from '../cart-interface';

@Injectable()
export class CartPrismaRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCart(userId: number) {
    const cart = await this.prisma.cart.create({
      data: {
        isActive: true,
        userId,
      },
    });

    return cart;
  }

  async getCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CreatedCartDTO | null> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        isActive: true,
      },
      include: {
        CartProduct: {
          include: {
            Product: isRelations,
          },
        },
      },
    });

    return cart;
  }

  async clearCart(userId: number): Promise<string> {
    const cart = await this.getCartByUserId(userId, true);

    await this.prisma.cart.update({
      where: {
        id: cart?.id ? cart.id : 0,
      },
      data: {
        isActive: false,
      },
    });

    return JSON.stringify({ message: `The cart ${cart?.id} has been cleaned` });
  }
}
