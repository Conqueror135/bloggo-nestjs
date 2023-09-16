import { BaseRepository } from 'src/commons/repositorities/base.repository';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/commons/constants/dbCollection.constant';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(USER) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
