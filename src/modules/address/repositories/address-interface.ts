import { CreateAddressDTO, CreatedAddressDTO } from '../dto/address.dto';

export abstract class IAddressRepository {
  abstract create(data: CreateAddressDTO): Promise<CreatedAddressDTO | null>;
  abstract findAddressByUserId(userId: number): Promise<CreatedAddressDTO[]>;
}
