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

  async getCartByUserId(userId: number): Promise<CreatedCartDTO | null> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        isActive: true,
      },
    });

    return cart;
  }
}
