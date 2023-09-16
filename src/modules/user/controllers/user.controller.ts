import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '@common/services/jwt-auth.guard';
import { CreateUserDto, IssueUserDto } from '../dtos/user.dto';
import { PaginationDto } from '@common/dtos/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('issue-account')
  async issueAccount(@Body() userDto: IssueUserDto) {
    return await this.userService.issueAccount(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getListUser(@Query() { page, limit }: PaginationDto) {
    return await this.userService.getList(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return await this.userService.updateUser(id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
