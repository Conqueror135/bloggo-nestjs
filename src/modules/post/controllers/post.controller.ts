import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/post.dto';
import { JwtAuthGuard } from '@common/services/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getAllPost() {
    return this.postService.getAllPosts();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }
}
