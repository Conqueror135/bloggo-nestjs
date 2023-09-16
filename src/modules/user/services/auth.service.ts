import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UserDto } from '../dtos/user.dto';
import { UserService } from './user.service';
import { JwtHelperService } from '@common/services/jwt.helper.service';
import { plainToClass } from 'class-transformer';
import { UserRepository } from '../repositorities/user.repository';
import { UserCommonService } from './user.common.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelperService: JwtHelperService,
    private readonly userRepository: UserRepository,
    private readonly userCommonService: UserCommonService,
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
  async login(loginDto: LoginUserDto) {
    const userInDb = await this.userRepository.findByCondition({
      username: loginDto.username,
      is_deleted: false,
    });
    if (userInDb) {
      const authenticted = this.userCommonService.comparePassword(
        loginDto.password,
        userInDb.password,
      );
      if (authenticted) {
        const userReal = plainToClass(UserDto, userInDb, {
          excludeExtraneousValues: true,
        });
        userReal._id = userInDb._id;

        const token = await this.jwtHelperService.createToken(userReal);
        return {
          token,
        };
      }
    }
    throw new HttpException(
      'Username or password incorrect!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
