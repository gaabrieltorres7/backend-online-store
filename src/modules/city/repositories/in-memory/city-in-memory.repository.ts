import { CityDTO } from '../../dto/city.dto';
import { ICityRepository } from '../city-interface';

const CITY_SP = {
  id: 1,
  name: 'São Paulo',
  stateId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CITY_SANTOS = {
  id: 2,
  name: 'Santos',
  stateId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CITY_RECIFE = {
  id: 3,
  name: 'Recife',
  stateId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class CityInMemoryRepository implements ICityRepository {
  private cities: CityDTO[] = [CITY_SP, CITY_SANTOS, CITY_RECIFE];

  async getAllCitiesByStateId(stateId: number): Promise<CityDTO[]> {
    const cities = this.cities.filter((city) => city.stateId === stateId);
    return cities;
  }
  async findCityById(id: number): Promise<CityDTO | null> {
    const city = this.cities.find((city) => city.id === id);

    return city || null;
  }
}
