import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UserRepository } from '../repositorities/user.repository';
import { UserCommonService } from './user.common.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCommonService: UserCommonService,
  ) {}

  async create(userDto: CreateUserDto) {
    userDto.password = this.userCommonService.encryptPassword(userDto.password);
    const userInDb = await this.userRepository.findByCondition({
      $or: [{ email: userDto.email }, { username: userDto.username }],
    });
    if (userInDb) {
      if (userDto.username === userInDb.username) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      if (userDto.email === userInDb.email) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }
    return await this.userRepository.create(userDto);
  }
}
