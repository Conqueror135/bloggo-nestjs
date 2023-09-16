import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositorities/post.repository';
import { CreatePostDto } from '../dtos/post.dto';
import { TokenDataInterface } from '@common/interfaces/token.data.interface';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
  ) {}
  async getAllPosts() {
    return this.postRepository.findAll();
  }
  async createPost(user: TokenDataInterface, post: CreatePostDto) {
    post.user = user._id;
    const newPost = await this.postRepository.create(post);
    return newPost;
  }
  async getPostById(postId: string) {
    const post = await this.postRepository.findById(postId);

    if (post) {
      const data = await post.populate([
        { path: 'user', select: 'username email fullname' },
      ]);
      return data;
    } else {
      throw new NotFoundException(postId);
    }
  }
  async getPostByMe(id: string) {
    const data = await this.postRepository.getByCondition({
      user: id,
      is_deleted: false,
    });

    return data;
  }
}
