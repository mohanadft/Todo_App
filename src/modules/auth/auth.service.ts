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
  ) { }

  async getTokens(userId: string, email: string) {
    const access_token = await this.jwtService.signAsync(
      {
        roles: 'user',
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
      select: {
        id: true,
        email: true,
        tasks: true,
      },
    });

    const access_token = await this.getTokens(userDB.id, userDB.email);

    return { data: userDB, access_token };
  }

  async signIn(data: User) {
    const userDB = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (!userDB) throw new ForbiddenException('User does not exist.');

    const matches = compare(data.password, userDB.password);
    if (!matches) throw new ForbiddenException('Access Denied');

    const access_token = await this.getTokens(userDB.id, userDB.email);
    delete userDB.password;
    return { data: userDB, access_token };
  }

  async signInAsAnAdmin(password: string) {
    if (password !== this.configService.get('ADMIN_PASSWORD'))
      throw new ForbiddenException('Access denied');

    const access_token = await this.jwtService.signAsync(
      {
        roles: 'admin',
        name: 'admin',
      },
      {
        secret: this.configService.get('SECRET'),
        expiresIn: 15 * 60,
      },
    );
    return { access_token };
  }
}
