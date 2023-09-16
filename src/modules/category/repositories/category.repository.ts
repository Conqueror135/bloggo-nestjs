import { CATEGORY } from '@common/constants/dbCollection.constant';
import { BaseRepository } from '@common/repositorities/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../models/category.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectModel(CATEGORY) private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}
