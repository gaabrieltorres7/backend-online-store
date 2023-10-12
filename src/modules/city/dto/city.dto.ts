import { ReturnStateInUserDTO } from 'src/modules/state/dto/state.dto';

export type CityDTO = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  stateId: number;
  // Addresses: any; //AddressDTO[];
};

export type ReturnCityInUserDTO = {
  name: string;
  states: ReturnStateInUserDTO;
};
