import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO, UserCreatedDTO } from './dto/user.dto';
import { IUserRepository } from './repositories/user-interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserCreatedDTO | null> {
    const user = await this.userRepository.findUserByEmail(data.email);

    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const password = await hash(data.password, 10);
    return await this.userRepository.save({ ...data, password });
  }

  async findUserById(id: number): Promise<UserCreatedDTO | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findAllUsers(): Promise<UserCreatedDTO[] | null> {
    return await this.userRepository.findAllUsers();
  }

  async findUserByIdUsingRelations(
    userId: number,
  ): Promise<UserCreatedDTO | null> {
    const user = await this.userRepository.findUserByIdUsingRelations(userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserByEmail(email: string): Promise<UserCreatedDTO | null> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
