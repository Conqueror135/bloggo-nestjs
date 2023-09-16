import { CATEGORY } from '@common/constants/dbCollection.constant';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './models/category.model';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { CommonAppModule } from '@common/common-app.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CATEGORY,
        schema: CategorySchema,
      },
    ]),
    CommonAppModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
