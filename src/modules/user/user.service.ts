import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import {
  CreateUserDTO,
  UpdateUserPasswordDTO,
  UserCreatedDTO,
} from './dto/user.dto';
import { IUserRepository } from './repositories/user-interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserCreatedDTO | null> {
    const userEmail = await this.userRepository.findUserByEmail(data.email);
    const userCPF = await this.userRepository.findByCPF(data.cpf);

    if (userEmail || userCPF)
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

  async updateUserPassword(
    userId: number,
    data: UpdateUserPasswordDTO,
  ): Promise<UserCreatedDTO | null> {
    const { newPassword, oldPassword } = data;

    const user = await this.userRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await compare(oldPassword, user.password);
    if (!passwordMatch) throw new BadRequestException('Invalid password');

    const newPasswordHashed = await hash(newPassword, 10);
    const updatedUser = await this.userRepository.updateUserPassword(userId, {
      oldPassword,
      newPassword: newPasswordHashed,
    });

    return updatedUser;
  }
}
