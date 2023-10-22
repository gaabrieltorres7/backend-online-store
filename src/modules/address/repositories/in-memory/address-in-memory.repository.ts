import { CreateAddressDTO, CreatedAddressDTO } from '../../dto/address.dto';
import { IAddressRepository } from '../address-interface';

export class AddressInMemoryRepository implements IAddressRepository {
  private addresses: CreatedAddressDTO[] = [];

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
}
