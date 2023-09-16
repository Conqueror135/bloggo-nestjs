import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  content: string;
  user: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;
  content: string;
}
