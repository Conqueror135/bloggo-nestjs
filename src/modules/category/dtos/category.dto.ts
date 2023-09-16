import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  _id: string;
  @IsNotEmpty()
  name: string;
  description: string;
}
export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  description: string;
}
