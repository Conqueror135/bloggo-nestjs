import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/category.dto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getAll() {
    return await this.categoryRepository.findAll();
  }
  async getList(page: number, limit: number) {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.categoryRepository.countDocuments({
      is_deleted: false,
    });
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }
    const data = await this.categoryRepository.getByCondition(
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
  async createCategory(categoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(categoryDto);
  }
  async getCategoryById(id: string) {
    return await this.categoryRepository.findById(id);
  }
  async deleteCategory(id: string) {
    return await this.categoryRepository.deleteOne(id);
  }
  async deleteCategorySoft(id: string) {
    return await this.categoryRepository.findByIdAndUpdate(id, {
      is_deleted: true,
    });
  }
  async update(id: string, categoryDto: CreateCategoryDto) {
    return await this.categoryRepository.findByIdAndUpdate(id, categoryDto);
  }
}
