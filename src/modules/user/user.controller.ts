import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);

    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    return user;
  }

  @Post('')
  async addUser(@Body() user: User) {
    const userDB = await this.userService.addUser(user);
    return userDB;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: { email: string | undefined; password: string | undefined },
  ) {
    const userDB = await this.userService.updateUser(id, user);
    return userDB;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
