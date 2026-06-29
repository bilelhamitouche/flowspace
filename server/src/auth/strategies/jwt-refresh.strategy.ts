import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh,
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    return this.authService.verifyRefreshToken(
      request.cookies?.Refresh,
      payload.sub,
    );
  }
}
