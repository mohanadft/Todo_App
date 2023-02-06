import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, UpdatedTaskOptions } from '../dtos/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  async addTask(@Body() data: Task) {
    return await this.taskService.addTask(data);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    data: UpdatedTaskOptions,
  ) {
    return await this.taskService.updateTask(id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.deleteTask(id);
  }
}
