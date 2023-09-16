import { Module } from '@nestjs/common';
import { JwtHelperService } from './services/jwt.helper.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [JwtHelperService],
  exports: [JwtHelperService],
})
export class CommonAppModule {}
