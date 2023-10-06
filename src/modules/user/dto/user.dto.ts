export type CreateUserDTO = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
};

export type UserCreatedDTO = {
  id: number;
} & CreateUserDTO;
