import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SerializedUser, UpdatedUserOptions, User } from '../dtos/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users.map((user) => new SerializedUser(user));
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);

    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    return new SerializedUser(user);
  }

  @Post('')
  async addUser(@Body() user: User) {
    const userDB = await this.userService.addUser(user);
    return new SerializedUser(userDB);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdatedUserOptions) {
    const userDB = await this.userService.updateUser(id, user);
    return new SerializedUser(userDB);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.deleteUser(id);

      if (!deletedUser)
        throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

      return { msg: 'Successfully Deleted.' };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025')
          throw new HttpException(
            'Record to delete does not exist.',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }
}
