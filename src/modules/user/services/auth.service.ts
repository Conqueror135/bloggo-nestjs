import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from '../dtos/user.dto';
import { UserService } from './user.service';
import { JwtHelperService } from '@common/services/jwt.helper.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelperService: JwtHelperService,
  ) {}
  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const userReal = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    });
    const token = await this.jwtHelperService.createToken(userReal);
    return {
      user: userReal,
      token,
    };
  }
}
