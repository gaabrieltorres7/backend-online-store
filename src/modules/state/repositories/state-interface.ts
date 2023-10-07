import { StateDTO } from '../dto/state.dto';

export abstract class IStateRepository {
  abstract findAll(): Promise<StateDTO>;
}
