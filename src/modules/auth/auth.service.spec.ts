import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from '../user/enum/user-type.enum';
import { UserInMemoryRepository } from '../user/repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from '../user/repositories/user-interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const USER_JOHN = {
  cpf: '00000000000',
  createdAt: new Date(),
  email: 'teste@email.com',
  id: 1,
  name: 'John Doe',
  password: '123456',
  phone: '00000000000',
  typeUser: UserType.User,
  updatedAt: new Date(),
};

const LOGIN = {
  email: USER_JOHN.email,
  password: USER_JOHN.password,
};

describe('AuthService', () => {
  let sut: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(USER_JOHN),
          },
        },
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(userService).toBeDefined();
  });

  // it('should be able to return an user with valid email and password', async () => {
  //   const result = await sut.login(LOGIN);
  //   expect(result).toHaveProperty('accessToken');
  // });

  it('should not be able to return an user with invalid password', async () => {
    await expect(
      sut.login({ ...LOGIN, password: '4324' }),
    ).rejects.toThrowError();
  });

  it('should not be able to return an user with invalid email', async () => {
    await expect(
      sut.login({ ...LOGIN, email: 'teste@email.com' }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
