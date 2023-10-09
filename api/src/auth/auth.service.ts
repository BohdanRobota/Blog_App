import { Injectable, Logger, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { IUserWithTokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService) { }

  async refreshTokens(refreshToken: string, agent: string): Promise<IUserWithTokens> {
    const token = await this.prismaService.token.findUnique({
      where: {
        token: refreshToken
      }
    })
    if (!token) {
      throw new UnauthorizedException();
    }
    if (new Date(token.exp) < new Date()) {
      await this.tokenService.deleteRefreshToken(refreshToken);
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(token.userId);
    const tokens = await this.tokenService.generateTokens(user, agent);
    return { user, tokens };
  }

  async register(dto: RegisterDto, agent: string): Promise<IUserWithTokens> {
    const candidate = await this.userService.findOne(dto.email);
    if (candidate) {
      throw new BadRequestException('User with this email is already exist');
    }
    const newUser = await this.userService.save(dto).catch(err => {
      this.logger.error(err);
      throw new Error(err);
    })
    const tokens = await this.tokenService.generateTokens(newUser, agent);
    return { user: newUser, tokens };
  }

  async login(dto: LoginDto, agent: string): Promise<IUserWithTokens> {
    const user = await this.userService.findOne(dto.email).catch(err => {
      this.logger.error(err);
      throw new Error(err);
    })
    if (!user) {
      throw new NotFoundException(`User with email: "${dto.email}" not found`);
    }
    this.comparePasswords(dto.password, user.password);
    const tokens = await this.tokenService.generateTokens(user, agent);
    return { user, tokens };
  }

  private comparePasswords(firstPassword: string, secondPassword: string) {
    const isPassEquals = compareSync(firstPassword, secondPassword);
    if (!isPassEquals) {
      throw new UnauthorizedException("Incorrect email or password");
    }
  }

  createAuthResponse(userWithTokens: IUserWithTokens) {
    const { password, ...user } = userWithTokens.user;
    const { accessToken } = userWithTokens.tokens;
    return { user, accessToken };
  }
}
