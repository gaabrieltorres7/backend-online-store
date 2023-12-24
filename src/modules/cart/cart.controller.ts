import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { CreateCartSchemaDTO } from './schemas/create-cart.schemas';

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
}
