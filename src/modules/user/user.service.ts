import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUsers() {
    return this.prismaService.user.findMany();
  }

  getUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  addUser(user: User) {
    return this.prismaService.user.create({ data: user });
  }

  updateUser(
    id: string,
    data: { email: string | undefined; password: string | undefined },
  ) {
    const updateUser = this.prismaService.user.update({
      where: { id },
      data,
    });
    return updateUser;
  }

  deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
