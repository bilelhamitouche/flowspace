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
import { RegisterDto } from './dto/register.dto';
import * as schema from '../database/schema';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
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
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
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
  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  async logout(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user.id);
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(
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
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@CurrentUser() user: typeof schema.users.$inferSelect) {
    if (!user) throw new UnauthorizedException();
    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
