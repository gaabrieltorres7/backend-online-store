import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreateUserDTO, UserCreatedDTO } from '../../dto/user.dto';
import { IUserRepository } from '../user-interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDTO): Promise<UserCreatedDTO> {
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

  async findByCPF(cpf: string): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findUnique({ where: { cpf } });
  }

  async updateUserPassword(
    userId: number,
    data: { newPassword: string; oldPassword: string },
  ): Promise<UserCreatedDTO | null> {
    const { newPassword } = data;
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPassword, updatedAt: new Date() },
    });

    return updatedUser;
  }
}
