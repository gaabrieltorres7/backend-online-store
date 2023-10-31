import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/address.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() data: CreateAddressDTO, @Request() { user }) {
    return await this.addressService.create({ ...data, userId: user.sub });
  }

  @Get('/:userId')
  async findAddressByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.addressService.findAddressByUserId(userId);
  }
}
