import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatedUserOptions, User } from '../dtos/user.dto';
import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUserById(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: { password: false },
    });
  }

  async addUser(user: User) {
    const encryptedPassword = hashPassword(user.password);

    return await this.prismaService.user.create({
      data: { ...user, password: encryptedPassword },
      select: { password: false },
    });
  }

  async updateUser(id: string, data: UpdatedUserOptions) {
    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...data,
        password: data.password ? hashPassword(data.password) : undefined,
      },
      select: {
        password: false,
      },
    });

    return updateUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.prismaService.user.delete({ where: { id } });
    return deletedUser ? true : false;
  }
}
