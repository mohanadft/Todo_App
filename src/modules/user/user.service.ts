import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatedUserOptions, User } from '../dtos/user.dto';
import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  // create guards to validate the request, only admin should be allowed to get all users

  // create provider to inject the model repository
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
    // why is this not an async function?
    // your update the DB, it should be asynchronous
    const updateUser = this.prismaService.user.update({
      where: { id },
      data: {
        ...data,
        // there's no password validation, don't include the password with the data
        // make it a separate end point
        password: data.password ? hashPassword(data.password) : undefined,
      },
    });

    return updateUser;
  }

  deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
