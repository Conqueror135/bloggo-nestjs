import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    return {
      user,
    };
  }
}
