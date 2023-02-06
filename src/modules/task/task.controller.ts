import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, UpdatedTaskOptions } from '../dtos/task.dto';
import { User } from '../auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@User('sub') userId: string) {
    return this.taskService.getTasks(userId);
  }

  @Get(':id')
  getTaskById(
    @User('sub') userId: string,
    @Param('id', ParseUUIDPipe) taskId: string,
  ) {
    return this.taskService.getTaskById(userId, taskId);
  }

  @Post()
  addTask(@User('sub') userId: string, @Body() data: Task) {
    return this.taskService.addTask(userId, data);
  }

  @Patch(':id')
  updateTask(
    @User('sub') userId: string,
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() data: UpdatedTaskOptions,
  ) {
    console.log({ data, userId, taskId });
    return this.taskService.updateTask(userId, taskId, data);
  }

  @Delete(':id')
  deleteTask(
    @User('sub') userId: string,
    @Param('id', ParseUUIDPipe) taskId: string,
  ) {
    return this.taskService.deleteTask(userId, taskId);
  }
}
