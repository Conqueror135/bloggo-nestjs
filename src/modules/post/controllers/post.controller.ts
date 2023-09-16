import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(req.user, post);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-me')
  async getAllByMe(@Req() req: any) {
    return this.postService.getPostByMe(req.user._id);
  }

  @Get('list')
  async getListPost() {
    return await this.postService.getList();
  }
  @Get('by-category/:id')
  getListPostByCategory(@Param('id') id: string) {
    return this.postService.getListByCategory(id);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePostSoft(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() postDto: CreatePostDto) {
    return await this.postService.update(id, postDto);
  }
}
