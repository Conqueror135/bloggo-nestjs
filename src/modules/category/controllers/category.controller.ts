import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/category.dto';
import { JwtAuthGuard } from '@common/services/jwt-auth.guard';
import { PaginationDto } from '@common/dtos/pagination.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Get('list')
  async getListCategory(@Query() { page, limit }: PaginationDto) {
    return await this.categoryService.getList(page, limit);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSoft(@Param('id') id: string) {
    return await this.categoryService.deleteCategorySoft(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.update(id, categoryDto);
  }
}
