import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { CityService } from '../city/city.service';
import { CreateAddressDTO, CreatedAddressDTO } from './dto/address.dto';
import { IAddressRepository } from './repositories/address-interface';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(data: CreateAddressDTO): Promise<CreatedAddressDTO | null> {
    const user = await this.userService.findUserById(data.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const city = await this.cityService.findCityById(data.cityId);
    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    return await this.addressRepository.create(data);
  }

  async findAddressByUserId(userId: number): Promise<CreatedAddressDTO[]> {
    const addresses = await this.addressRepository.findAddressByUserId(userId);
    if (!addresses || addresses.length === 0) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
    return addresses;
  }
}
