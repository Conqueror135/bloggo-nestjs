import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  _id: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  post: string;

  status: string;
}
export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  user: string;

  @IsNotEmpty()
  post: string;
}
