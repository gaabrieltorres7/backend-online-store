import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserSchemaDTO } from './schemas/create-user.schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.userService.createUser(data);
    const newUser = {
      ...user,
      password: undefined,
    };
    return newUser;
  }
}
