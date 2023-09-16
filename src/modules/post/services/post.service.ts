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
  async getPostByMe(id: string, page: number, limit: number) {
    const query = {
      user: id,
      is_deleted: false,
    };
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.postRepository.countDocuments(query);
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }

    const data = await this.postRepository.getByCondition(query, null, {
      sort: {
        updated_at: -1,
      },
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    });

    return { data, total, page, limit, totalPage };
  }
  async getList(page: number, limit: number) {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.postRepository.countDocuments({
      is_deleted: false,
    });
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }
    const data = await this.postRepository.getByCondition(
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
  async getListByCategory(idCategory: string, page: number, limit: number) {
    const query = {
      is_deleted: false,
      category: idCategory,
    };
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.postRepository.countDocuments(query);
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }

    const data = await this.postRepository.getByCondition(query, null, {
      sort: {
        updated_at: -1,
      },
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    });
    return { data, total, page, limit, totalPage };
  }
  async deletePost(id: string) {
    return await this.postRepository.deleteOne(id);
  }
  async deletePostSoft(id: string) {
    return await this.postRepository.findByIdAndUpdate(id, {
      is_deleted: true,
    });
  }
  async update(id: string, postDto: CreatePostDto) {
    return await this.postRepository.findByIdAndUpdate(id, postDto);
  }
}
