import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { Roles } from '../decorators/roles.decorator';
import { UserCreatedDTO } from './dto/user.dto';
import { UserType } from './enum/user-type.enum';
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

  @Roles(UserType.Admin)
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Roles(UserType.Admin, UserType.User)
  @Get('/:userId')
  async findUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserCreatedDTO | null> {
    const user = await this.userService.findUserByIdUsingRelations(userId);
    return user;
  }
}
