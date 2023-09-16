import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  fullname: string;
  bio: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  gender: string;
  address: string;
  avatar: string;
  status: string;
  phone: string;
  type: string;
  is_sysadmin: boolean;
  is_deleted: boolean;
  active: boolean;
}

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  fullname: string;
  bio: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  gender: string;
  address: string;
  avatar: string;
  status: string;
  phone: string;
  type: string;
  is_sysadmin: boolean;
  is_deleted: boolean;
  active: boolean;
}
