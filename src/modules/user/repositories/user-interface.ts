import { CreateUserDTO, UserCreatedDTO } from '../dto/user.dto';

export abstract class IUserRepository {
  abstract save(data: CreateUserDTO): Promise<UserCreatedDTO | null>;
  abstract findUserById(id: number): Promise<UserCreatedDTO | null>;
  abstract findAllUsers(): Promise<UserCreatedDTO[] | null>;
}
