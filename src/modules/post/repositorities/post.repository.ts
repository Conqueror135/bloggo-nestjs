import { BaseRepository } from 'src/commons/repositorities/base.repository';
import { Injectable } from '@nestjs/common';
import { Post } from '../models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { POST } from 'src/commons/constants/dbCollection.constant';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectModel(POST) private readonly postModel: Model<Post>) {
    super(postModel);
  }
  async countDocuments(filter) {
    return this.postModel.countDocuments(filter);
  }
}
