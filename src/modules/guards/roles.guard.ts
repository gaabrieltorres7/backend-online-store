import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const loginPayload = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);
    request['user'] = loginPayload;

    if (!loginPayload) {
      console.log('loginPayload', loginPayload);
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}
