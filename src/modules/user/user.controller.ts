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
import { UpdatedUserOptions, User } from '../dtos/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUserById(id);

    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    return user;
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdatedUserOptions,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const deletedUser = this.userService.deleteUser(id);

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
