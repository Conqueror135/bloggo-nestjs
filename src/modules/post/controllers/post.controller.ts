import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/post.dto';
import { JwtAuthGuard } from '@common/services/jwt-auth.guard';
import { PaginationDto } from '@common/dtos/pagination.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

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
  async getAllByMe(@Req() req: any, @Query() { page, limit }: PaginationDto) {
    return this.postService.getPostByMe(req.user._id, page, limit);
  }

  @Get('list')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  async getListPost(@Query() { page, limit }: PaginationDto) {
    return await this.postService.getList(page, limit);
  }

  @Get('by-category/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  getListPostByCategory(
    @Param('id') id: string,
    @Query() { page, limit }: PaginationDto,
  ) {
    return this.postService.getListByCategory(id, page, limit);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
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
