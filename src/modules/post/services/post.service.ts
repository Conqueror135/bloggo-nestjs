import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositorities/post.repository';
import { CreatePostDto } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async getAllPosts() {
    return this.postRepository.findAll();
  }
  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    return newPost;
  }
}
