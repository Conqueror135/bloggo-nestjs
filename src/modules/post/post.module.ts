import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { POST } from 'src/commons/constants/dbCollection.constant';
import { PostSchema } from './models/post.model';
import { PostRepository } from './repositorities/post.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: POST,
        schema: PostSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
