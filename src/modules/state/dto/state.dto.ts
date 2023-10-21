import { CityDTO } from '../../../modules/city/dto/city.dto';

export type StateDTO = {
  id: number;
  name: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
  City: CityDTO[]; //CityDTO[];
};

export type ReturnStateInUserDTO = {
  name: string;
};
