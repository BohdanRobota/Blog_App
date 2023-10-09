import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { add } from 'date-fns';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ITokens } from 'src/auth/interfaces';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,) { }

  deleteRefreshToken(token: string) {
    const currentToken = this.checkTokenExisting(token);
    if (!currentToken) return null;
    return this.prismaService.token.delete({ where: { token } }).catch(err => {
      console.log(err);
      return null;
    });
  }

  async generateTokens(user: User, agent: string): Promise<ITokens> {
    const accessToken = 'Bearer ' + this.jwtService.sign({
      id: user.id,
      email: user.email
    })
    const refreshToken = await this.saveToken(user.id, agent);
    return { accessToken, refreshToken };
  }

  private async saveToken(userId: string, agent: string) {
    const _token = await this.prismaService.token.findFirst({ where: { userId, userAgent: agent } });
    const token = _token?.token ?? '';
    return this.prismaService.token.upsert({
      where: { token },
      update: {
        token: v4(),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent
      }
    })
  }

  async checkTokenExisting(token: string) {
    const currentToken = await this.prismaService.token.findFirst({ where: { token } })
    return currentToken ?? null;
  }
}
