import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { CreateCartSchemaDTO } from './schemas/create-cart.schemas';
import { UpdateCartSchemaDTO } from './schemas/update-cart.schemas';

@Roles(UserType.Admin, UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(
    @Body() insertCart: CreateCartSchemaDTO,
    @UserId() userId: number,
  ) {
    const cart = await this.cartService.insertProductToCart(insertCart, userId);

    return cart;
  }

  @Get()
  async getCartByUserId(@UserId() userId: number) {
    const cart = await this.cartService.getCartByUserId(userId, true);

    return cart;
  }

  @Delete()
  async clearCart(@UserId() userId: number) {
    return await this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId', ParseIntPipe) productId: number,
    @UserId() userId: number,
  ) {
    return this.cartService.deleteProductInCart(productId, userId);
  }

  @Patch()
  async updateProductInCart(
    @Body() updateCartDTO: UpdateCartSchemaDTO,
    @UserId() userId: number,
  ) {
    return await this.cartService.updateProductToCart(updateCartDTO, userId);
  }
}
