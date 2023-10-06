import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = await this.userService.createUser(data);
    const newUser = {
      ...user,
      password: undefined,
    };
    return newUser;
  }
}
