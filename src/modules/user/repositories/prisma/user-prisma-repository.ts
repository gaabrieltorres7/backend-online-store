import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CreateUserDTO, UserCreatedDTO } from '../../dto/user.dto';
import { IUserRepository } from '../user-interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: CreateUserDTO): Promise<UserCreatedDTO | null> {
    //TODO: validate if user already exists
    return await this.prisma.user.create({ data });
  }
}
