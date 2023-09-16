import { Module } from '@nestjs/common';
import { UserRepository } from './repositorities/user.repository';
import { UserCommonService } from './services/user.common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from '@common/constants/dbCollection.constant';
import { UserSchema } from './models/user.model';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CommonAppModule } from '@common/common-app.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER,
        schema: UserSchema,
      },
    ]),
    CommonAppModule,
  ],
  controllers: [AuthController],
  providers: [UserCommonService, UserRepository, UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
