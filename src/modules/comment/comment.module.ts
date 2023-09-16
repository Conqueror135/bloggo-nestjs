import { Module } from '@nestjs/common';
import { CommentRepository } from './repositories/comment.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMENT } from '@common/constants/dbCollection.constant';
import { CommentSchema } from './models/comment.model';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COMMENT,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
})
export class CommentModule {}
