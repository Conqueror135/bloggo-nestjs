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
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/comment.dto';
import { JwtAuthGuard } from '@common/services/jwt-auth.guard';
import { PaginationDto } from '@common/dtos/pagination.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll() {
    return await this.commentService.getAll();
  }

  @Get('list')
  async getListComment(@Query() { page, limit }: PaginationDto) {
    return await this.commentService.getList(page, limit);
  }
  @Get('by-post/:id')
  async getListCommentByPost(
    @Param('id') id: string,
    @Query() { page, limit }: PaginationDto,
  ) {
    return await this.commentService.getListByPost(id, page, limit);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() commentDto: CreateCommentDto) {
    return this.commentService.createComment(req.user, commentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSoft(@Param('id') id: string) {
    return await this.commentService.deleteCommentSoft(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentDto: CreateCommentDto,
  ) {
    return await this.commentService.update(id, commentDto);
  }
}
