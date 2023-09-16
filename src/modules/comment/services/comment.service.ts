import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dtos/comment.dto';
import { CommentRepository } from '../repositories/comment.repository';
import { TokenDataInterface } from '@common/interfaces/token.data.interface';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
  async getAll() {
    return await this.commentRepository.findAll();
  }
  async getList(page: number, limit: number) {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.commentRepository.countDocuments({
      is_deleted: false,
    });
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }
    const data = await this.commentRepository.getByCondition(
      { is_deleted: false },
      null,
      {
        sort: {
          updated_at: -1,
        },
        skip: (Number(page) - 1) * Number(limit),
        limit: Number(limit),
      },
    );
    return { data, total, page, limit, totalPage };
  }
  async getListByPost(post: string, page: number, limit: number) {
    const query = {
      post,
      is_deleted: false,
    };
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.commentRepository.countDocuments(query);
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }
    const data = await this.commentRepository.getByCondition(query, null, {
      sort: {
        updated_at: -1,
      },
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    });
    return { data, total, page, limit, totalPage };
  }
  async createComment(user: TokenDataInterface, commentDto: CreateCommentDto) {
    commentDto.user = user._id;

    return await this.commentRepository.create(commentDto);
  }
  async getCommentById(id: string) {
    return await this.commentRepository.findById(id);
  }
  async deleteComment(id: string) {
    return await this.commentRepository.deleteOne(id);
  }
  async deleteCommentSoft(id: string) {
    return await this.commentRepository.findByIdAndUpdate(id, {
      is_deleted: true,
    });
  }
  async update(id: string, commentDto: CreateCommentDto) {
    return await this.commentRepository.findByIdAndUpdate(id, commentDto);
  }
}
