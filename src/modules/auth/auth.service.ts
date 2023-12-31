import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IUserRepository } from '../user/repositories/user-interface';
import { LoginDTO, ReturnLoginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDTO): Promise<ReturnLoginDTO> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: user.id,
      typeUser: user.typeUser,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
