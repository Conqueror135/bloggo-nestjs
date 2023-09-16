import { COMMENT } from '@common/constants/dbCollection.constant';
import { BaseRepository } from '@common/repositorities/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectModel(COMMENT) private readonly commentModel: Model<Comment>,
  ) {
    super(commentModel);
  }
}
