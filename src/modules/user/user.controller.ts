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

  // you don't have to add an empty string
  @Get('')
  async getUsers() {
    // your controller should not process data, only call the service
    const users = await this.userService.getUsers();
    return users.map((user) => new SerializedUser(user));
  }

  // why's the id a UUID? it should be an integer
  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);

    // Create http service to handle errors
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    return new SerializedUser(user);
  }

  // DTO should only be included in each module
  @Post('')
  async addUser(@Body() user: User /* Don't include the model in the body, create a DTO*/) {
    const userDB = await this.userService.addUser(user);
    return new SerializedUser(userDB);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdatedUserOptions,
  ) {
    const userDB = await this.userService.updateUser(id, user);
    // lookup scopes, it exists in sequelize & I believe it exists in prisma
    return new SerializedUser(userDB);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      // again, no logic in the controller
      const deletedUser = await this.userService.deleteUser(id);

      if (!deletedUser)
        throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
      
        // delete function should return a boolean or nothing  
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
