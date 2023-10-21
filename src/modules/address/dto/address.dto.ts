import { ReturnCityInUserDTO } from '../../../modules/city/dto/city.dto';

export type CreateAddressDTO = {
  complement?: string | null;
  numberAddress: number;
  cep: string;
  cityId: number;
  userId: number;
};

export type CreatedAddressDTO = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
} & CreateAddressDTO;

export type ReturnAddressInUserDTO = {
  id: number;
  city?: ReturnCityInUserDTO;
} & CreateAddressDTO;
