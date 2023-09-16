import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @Expose()
  _id: string;
  @Expose()
  fullname: string;

  bio: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  gender: string;
  address: string;
  avatar: string;
  status: string;
  phone: string;

  @Expose()
  type: string;
  @Expose()
  is_sysadmin: boolean;
  @Expose()
  is_deleted: boolean;
  @Expose()
  active: boolean;
}
export class CreateUserDto {
  @Expose()
  fullname: string;

  bio: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  gender: string;
  address: string;
  avatar: string;
  status: string;
  phone: string;

  @Expose()
  type: string;
  @Expose()
  is_sysadmin: boolean;
  @Expose()
  is_deleted: boolean;
  @Expose()
  active: boolean;
}

export class UpdateUserDto {
  @Expose()
  @IsNotEmpty()
  id: string;

  @Expose()
  fullname: string;

  @Expose()
  bio: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @Expose()
  gender: string;
  address: string;
  avatar: string;
  status: string;
  phone: string;

  @Expose()
  type: string;
  @Expose()
  is_sysadmin: boolean;
  @Expose()
  is_deleted: boolean;
  @Expose()
  active: boolean;
}
