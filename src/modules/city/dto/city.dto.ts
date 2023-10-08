export type CityDTO = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  stateId: number;
  Addresses: any; //AddressDTO[];
};
