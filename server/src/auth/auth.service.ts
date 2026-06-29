import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import * as schema from '../database/schema';
import { SALT_ROUNDS } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(userId: string, email: string) {
    const expiresAccessToken = this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_EXPIRATION_MS',
    );
    const expiresRefreshToken = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_EXPIRATION_MS',
    );
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: `${expiresAccessToken}ms`,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: `${expiresRefreshToken}ms`,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.usersService.create(registerDto);
    const tokens = await this.login(newUser);
    return tokens;
  }

  async login(user: typeof schema.users.$inferSelect) {
    const tokens = await this.generateTokens(user.id, user.email);
    const hashedRefreshToken = await bcrypt.hash(
      tokens.refreshToken,
      SALT_ROUNDS,
    );
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });
    return tokens;
  }

  async logout(id: string) {
    await this.usersService.update(id, { refreshToken: null });
  }

  async verifyRefreshToken(refreshToken: string, userId: string) {
    const user = await this.usersService.findById(userId);
    const isMatch =
      user?.refreshToken &&
      (await bcrypt.compare(refreshToken, user.refreshToken));
    if (!isMatch) {
      throw new UnauthorizedException('Refresh Token is not valid');
    }
    return user;
  }
}
