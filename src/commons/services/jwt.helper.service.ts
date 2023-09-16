import { TokenDataInterface } from '@common/interfaces/token.data.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelperService {
  constructor(private readonly jwtService: JwtService) {}
  async createToken(dataToken: TokenDataInterface) {
    const data = JSON.parse(JSON.stringify(dataToken));

    const accessToken = await this.jwtService.signAsync(data, {
      secret: process.env.TOKEN_SECRETKEY,
      expiresIn: process.env.TOKEN_EXPIRESIN,
    });
    return accessToken;
  }
  async verifyToken(bearToken: string) {
    try {
      const token = bearToken.replace(/^Bearer\s/, '');

      const payload = this.jwtService.verify(token, {
        secret: process.env.TOKEN_SECRETKEY,
      });
      return payload;
    } catch (e) {
      throw new HttpException(
        {
          key: '',
          data: {},
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
