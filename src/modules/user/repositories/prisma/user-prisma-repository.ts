import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreateUserDTO, UserCreatedDTO } from '../../dto/user.dto';
import { IUserRepository } from '../user-interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: CreateUserDTO): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.create({ data });
  }

  async findUserById(id: number): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findAllUsers(): Promise<UserCreatedDTO[] | null> {
    return await this.prisma.user.findMany();
  }

  async findUserByIdUsingRelations(
    userId: number,
  ): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        Address: {
          include: {
            City: {
              include: {
                State: true,
              },
            },
          },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
