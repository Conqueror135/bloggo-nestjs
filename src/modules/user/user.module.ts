import { Module } from '@nestjs/common';
import { UserRepository } from './repositorities/user.repository';
import { UserCommonService } from './services/user.common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from '@common/constants/dbCollection.constant';
import { UserSchema } from './models/user.model';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [UserRepository, UserCommonService, UserService, AuthService],
})
export class UserModule {}
