import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCommonService {
  encryptPassword(plainText: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  }
  comparePassword(plainText: string, encrypedPassword: string) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  }
}
