import {
  CreateUserDTO,
  UpdateUserPasswordDTO,
  UserCreatedDTO,
} from '../../dto/user.dto';
import { UserType } from '../../enum/user-type.enum';
import { IUserRepository } from '../user-interface';
export class UserInMemoryRepository implements IUserRepository {
  private users: UserCreatedDTO[] = [];

  async createUser(data: CreateUserDTO): Promise<UserCreatedDTO> {
    const user: UserCreatedDTO = {
      id: 1,
      typeUser: UserType.User,
      ...data,
    };

    this.users.push(user);

    return user;
  }
  async findUserById(id: number): Promise<UserCreatedDTO | null> {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }
  async findAllUsers(): Promise<UserCreatedDTO[] | null> {
    const users = this.users;

    return users ?? null;
  }
  async findUserByIdUsingRelations(
    userId: number,
  ): Promise<UserCreatedDTO | null> {
    const user = this.users.find((user) => user.id === userId);

    return user ?? null;
  }
  async findUserByEmail(email: string): Promise<UserCreatedDTO | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }

  async findByCPF(cpf: string): Promise<UserCreatedDTO | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    return user ?? null;
  }

  async updateUserPassword(
    userId: number,
    data: UpdateUserPasswordDTO,
  ): Promise<UserCreatedDTO | null> {
    const { newPassword, oldPassword } = data;
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    if (user.password !== oldPassword) {
      return null;
    }

    user.password = newPassword;

    return user;
  }
}
