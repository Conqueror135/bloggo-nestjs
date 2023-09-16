import { Module } from '@nestjs/common';
import { JwtHelperService } from './services/jwt.helper.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule, PassportModule],
  providers: [JwtHelperService, JwtStrategy],
  exports: [JwtHelperService],
})
export class CommonAppModule {}
