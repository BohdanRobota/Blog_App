import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { options } from 'src/auth/config';
import { STRATEGIES } from 'src/auth/strategies';
import { UserModule } from '@user/user.module';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [JwtModule.registerAsync(options()), UserModule]
})
export class TokenModule { }
