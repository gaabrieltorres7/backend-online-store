import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ProductService } from './product.service';
import { CreateProductSchemaDTO } from './schemas/create-product.schemas';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async findAll() {
    return await this.productService.findAll();
  }

  @Roles(UserType.Admin)
  @Post('/create')
  async create(@Body() data: CreateProductSchemaDTO) {
    return await this.productService.create(data);
  }
}
