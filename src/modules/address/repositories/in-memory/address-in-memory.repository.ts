import { CreateAddressDTO, CreatedAddressDTO } from '../../dto/address.dto';
import { IAddressRepository } from '../address-interface';

const address = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  complement: 'test',
  numberAddress: 1,
  cep: 'test',
  cityId: 1,
  userId: 1,
};

export class AddressInMemoryRepository implements IAddressRepository {
  private addresses: CreatedAddressDTO[] = [address];

  async create(data: CreateAddressDTO): Promise<CreatedAddressDTO | null> {
    const address = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };

    this.addresses.push(address);

    return address;
  }

  async findAddressByUserId(userId: number): Promise<CreatedAddressDTO[]> {
    return this.addresses.filter((address) => address.userId === userId);
  }
}
