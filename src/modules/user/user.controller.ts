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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatedUserOptions, User } from '../dtos/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @Roles('admin')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUserById(id);

    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    return user;
  }

  @Post()
  @Roles('admin')
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Patch(':id')
  @Roles('admin')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdatedUserOptions,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @Roles('admin')
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
