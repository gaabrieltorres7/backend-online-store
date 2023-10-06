import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO, UserCreatedDTO } from './dto/user.dto';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserCreatedDTO> {
    const password = await hash(data.password, 10);
    return this.userRepository.save({ ...data, password });
  }
}
