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
