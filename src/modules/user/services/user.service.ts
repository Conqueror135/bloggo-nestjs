import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as generator from 'generate-password';
import { CreateUserDto, IssueUserDto } from '../dtos/user.dto';
import { UserRepository } from '../repositorities/user.repository';
import { UserCommonService } from './user.common.service';
import { MailService } from '@common/services/send-mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCommonService: UserCommonService,
    private readonly mailServise: MailService,
  ) {}

  async issueAccount(userDto: IssueUserDto) {
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
    const randomPassword = generator.generate({
      length: 8,
      numbers: true,
    });
    userDto.password = this.userCommonService.encryptPassword(randomPassword);
    const userData = await this.userRepository.create(userDto);
    if (userDto.email) {
      const recipient = userDto.email;
      const subject = 'Cấp tài khoản thành viên';

      const htmlText = `<h3>Bạn đã được cấp tài khoản quản tại Bloggo. Thông tin tài khoản:</h3>
                    <div><strong>Email: </strong>${userDto.email}</div>
                  <div><strong>Tên tài khoản: </strong>${userDto.username}</div>    
                  <div><strong>Mật khẩu: </strong>${randomPassword}</div>
                  <div>Vui lòng đăng nhập tại <a href="${process.env.HOST_WEB}">Link</a></div>`;

      await this.mailServise.sendMail(recipient, subject, htmlText);
    }
    return userData;
  }
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
  async findById(id: string) {
    return await this.userRepository.findById(id);
  }
  async deleteUser(id: string) {
    return await this.userRepository.findByIdAndUpdate(id, {
      is_deleted: false,
    });
  }
  async getList(page: number, limit: number) {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const total = await this.userRepository.countDocuments({
      is_deleted: false,
    });
    let totalPage = Math.floor(Number(total) / Number(limit));
    if (total % limit !== 0) {
      totalPage += 1;
    }
    const data = await this.userRepository.getByCondition(
      { is_deleted: false },
      null,
      {
        sort: {
          updated_at: -1,
        },
        skip: (Number(page) - 1) * Number(limit),
        limit: Number(limit),
      },
    );
    return { data, total, page, limit, totalPage };
  }
  async updateUser(id: string, userDto: CreateUserDto) {
    return await this.userRepository.findByIdAndUpdate(id, userDto);
  }
}
