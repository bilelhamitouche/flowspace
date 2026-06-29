import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import * as schema from '../database/schema';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const isProd = this.configService.get('NODE_ENV') === 'production';
    const tokens = await this.authService.register(registerDto);
    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      expires: new Date(Date.now() + Number(tokens.expiresAccessToken)),
      sameSite: isProd ? 'none' : 'lax',
      partitioned: isProd,
    });
    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      expires: new Date(Date.now() + Number(tokens.expiresRefreshToken)),
      sameSite: isProd ? 'none' : 'lax',
      partitioned: isProd,
    });
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async login(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    const isProd = this.configService.get('NODE_ENV') === 'production';
    const tokens = await this.authService.login(user);
    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      expires: new Date(Date.now() + Number(tokens.expiresAccessToken)),
      sameSite: isProd ? 'none' : 'lax',
      partitioned: isProd,
    });
    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      expires: new Date(Date.now() + Number(tokens.expiresRefreshToken)),
      sameSite: isProd ? 'none' : 'lax',
      partitioned: isProd,
    });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    const isProd = this.configService.get('NODE_ENV') === 'production';
    await this.authService.logout(user.id);
    response.clearCookie('Authentication', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    });
    response.clearCookie('Refresh', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    const isProd = this.configService.get('NODE_ENV') === 'production';
    const tokens = await this.authService.login(user);
    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      expires: new Date(Date.now() + Number(tokens.expiresAccessToken)),
      sameSite: isProd ? 'none' : 'lax',
      partitioned: isProd,
    });
    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      expires: new Date(Date.now() + Number(tokens.expiresRefreshToken)),
      sameSite: isProd ? 'none' : 'lax',
      partitioned: isProd,
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async user(@CurrentUser() user: typeof schema.users.$inferSelect) {
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
