import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get('/:userId')
  async findUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.findUserByIdUsingRelations(userId);
  }
}
