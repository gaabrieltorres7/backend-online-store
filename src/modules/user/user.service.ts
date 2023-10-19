import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO, UserCreatedDTO } from './dto/user.dto';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserCreatedDTO | null> {
    const user = await this.userRepository.findUserByEmail(data.email);

    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const password = await hash(data.password, 10);
    return await this.userRepository.save({ ...data, password });
  }

  async findUserById(id: number): Promise<UserCreatedDTO | null> {
    return await this.userRepository.findUserById(id);
  }

  async findAllUsers(): Promise<UserCreatedDTO[] | null> {
    return await this.userRepository.findAllUsers();
  }

  async findUserByIdUsingRelations(
    userId: number,
  ): Promise<UserCreatedDTO | null> {
    return await this.userRepository.findUserByIdUsingRelations(userId);
  }
}
