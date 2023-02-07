import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hashPassword } from '../../utils/bcrypt/';
import { User } from '../dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokens(userId: string, email: string) {
    const access_token = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get('SECRET'),
        expiresIn: 15 * 60,
      },
    );
    return access_token;
  }

  async signUp(data: User) {
    const userDB = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashPassword(data.password),
      },
    });

    const access_token = await this.getTokens(userDB.id, userDB.email);

    return { access_token };
  }

  async signIn(data: User) {
    const userDB = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (!userDB) throw new ForbiddenException('Access Denied');

    const matches = compare(data.password, userDB.password);
    if (!matches) throw new ForbiddenException('Access Denied');

    const access_token = await this.getTokens(userDB.id, userDB.email);
    return { access_token };
  }
}
