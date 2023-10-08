import { CityDTO } from '../dto/city.dto';

export abstract class ICityRepository {
  abstract getAllCitiesByStateId(stateId: number): Promise<CityDTO[]>;
}
