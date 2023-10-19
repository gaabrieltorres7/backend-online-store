import { UserCreatedDTO } from 'src/modules/user/dto/user.dto';

export type LoginDTO = {
  email: string;
  password: string;
};

export type ReturnLoginDTO = {
  accessToken: string;
  user: UserCreatedDTO;
};
