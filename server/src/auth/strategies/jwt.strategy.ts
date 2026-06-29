import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload) {
    return this.usersService.findById(payload.sub);
  }
}
