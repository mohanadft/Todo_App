import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatedUserOptions, User } from '../dtos/user.dto';
import { hashPassword } from '../../utils/bcrypt';

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
    const encryptedPassword = hashPassword(user.password);

    return this.prismaService.user.create({
      data: { ...user, password: encryptedPassword },
    });
  }

  updateUser(id: string, data: UpdatedUserOptions) {
    const updateUser = this.prismaService.user.update({
      where: { id },
      data: {
        ...data,
        password: data.password ? hashPassword(data.password) : undefined,
      },
    });

    return updateUser;
  }

  deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
