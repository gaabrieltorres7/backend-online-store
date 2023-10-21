import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from './enum/user-type.enum';
import { UserInMemoryRepository } from './repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from './repositories/user-interface';
import { UserService } from './user.service';

const USER_JOHN = {
  cpf: '00000000000',
  createdAt: new Date(),
  email: 'teste@email.com',
  id: 1,
  name: 'John Doe',
  password: '123456',
  phone: '00000000000',
  typeUser: UserType.User,
};

const USER_JANE = {
  cpf: '11111111111',
  createdAt: new Date(),
  email: 'teste2@email.com',
  id: 2,
  name: 'Jane Doe',
  password: '123456',
  phone: '00000000000',
};

describe('UserService', () => {
  let sut: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to create a new user', async () => {
    const result = await sut.createUser(USER_JOHN);

    expect(result).toHaveProperty('id');
  });

  it('should be able to return an user by email', async () => {
    await sut.createUser(USER_JOHN);
    const user = await sut.findUserByEmail(USER_JOHN.email);
    expect(user?.email).toEqual(USER_JOHN.email);
  });

  it('should not be able to return an user when it does not exist', async () => {
    await expect(sut.findUserByEmail('email@test.com')).rejects.toThrow(
      HttpException,
    );
  });

  it('should be able to return an user by id', async () => {
    await sut.createUser(USER_JOHN);
    const user = await sut.findUserById(USER_JOHN.id);
    expect(user?.id).toEqual(USER_JOHN.id);
  });

  it('should not be able to return an user when it does not exist', async () => {
    await expect(sut.findUserById(999)).rejects.toThrow(HttpException);
  });

  it('should be able to return all users', async () => {
    await sut.createUser(USER_JOHN);
    await sut.createUser(USER_JANE);
    const users = await sut.findAllUsers();
    expect(users).toHaveLength(2);
  });

  it('should be able to return an user by id using relations', async () => {
    await sut.createUser(USER_JOHN);
    const user = await sut.findUserByIdUsingRelations(USER_JOHN.id);
    expect(user?.id).toEqual(USER_JOHN.id);
  });

  it('should not be able to return an user by id using relations when it does not exist', async () => {
    await expect(sut.findUserByIdUsingRelations(999)).rejects.toThrow(
      HttpException,
    );
  });
});
