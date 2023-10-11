import { returnAddressInUserDTO } from 'src/modules/address/dto/address.dto';

export type CreateUserDTO = {
  name: string;
  email: string;
  phone: string | null;
  cpf: string;
  password: string;
};

export type UserCreatedDTO = {
  id: number;
  Address?: returnAddressInUserDTO[];
} & CreateUserDTO;
