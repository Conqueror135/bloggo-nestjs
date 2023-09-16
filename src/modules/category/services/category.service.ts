import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/category.dto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getAll() {
    return await this.categoryRepository.findAll();
  }
  async getList() {
    return await this.categoryRepository.getByCondition({ is_deleted: false });
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
