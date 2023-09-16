import { Module } from '@nestjs/common';
import { JwtHelperService } from './services/jwt.helper.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailService } from './services/send-mail.service';

@Module({
  imports: [JwtModule, PassportModule],
  providers: [JwtHelperService, JwtStrategy, MailService],
  exports: [JwtHelperService, MailService],
})
export class CommonAppModule {}
