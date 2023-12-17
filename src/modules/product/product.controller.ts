import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Roles(UserType.Admin, UserType.User)
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) productId: number) {
    return await this.productService.findById(productId);
  }

  @Roles(UserType.Admin)
  @Delete('/delete/:id')
  async delete(@Param('id', ParseIntPipe) productId: number) {
    return await this.productService.delete(productId);
  }
}
