import { Controller, Get } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CategoryService } from './category.service';

@Roles(UserType.Admin, UserType.User)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async findAll() {
    return await this.categoryService.findAll();
  }
}
