import { Body, Controller, Post, Get, Res, UnauthorizedException, HttpStatus, ClassSerializerInterceptor } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@common/decorators';
import { UseInterceptors } from '@nestjs/common/decorators';
import { TokenService } from 'src/token/token.service';
import { IUserWithTokens } from './interfaces';


const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response, @UserAgent() agent: string) {
    const userWithTokens = await this.authService.register(dto, agent);
    this.setRefreshTokenToCookies(userWithTokens, res);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
    const userWithTokens = await this.authService.login(dto, agent);
    this.setRefreshTokenToCookies(userWithTokens, res);
  }

  @Get('logout')
  async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.tokenService.deleteRefreshToken(refreshToken);
    res.clearCookie(REFRESH_TOKEN);
    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh')
  async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string) {
    console.log(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userWithTokens = await this.authService.refreshTokens(refreshToken, agent);
    this.setRefreshTokenToCookies(userWithTokens, res);
  }

  private setRefreshTokenToCookies(userWithTokens: IUserWithTokens, res: Response) {
    if (!userWithTokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, userWithTokens.tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(userWithTokens.tokens.refreshToken.exp),
      secure: this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/'
    })
    const authResponse = this.authService.createAuthResponse(userWithTokens);
    res.status(HttpStatus.CREATED).json(authResponse);
  }

}
