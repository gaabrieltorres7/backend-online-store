import { CreateUserDTO, UserCreatedDTO } from '../dto/user.dto';

export abstract class IUserRepository {
  abstract save(data: CreateUserDTO): Promise<UserCreatedDTO>;
}
