import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatedTaskOptions, Task } from '../dtos/task.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  getTasks() {
    return this.prismaService.task.findMany();
  }

  getTaskById(id: string) {
    return this.prismaService.task.findUnique({ where: { id } });
  }

  addTask(task: Task) {
    return this.prismaService.task.create({
      data: task,
    });
  }

  updateTask(id: string, data: UpdatedTaskOptions) {
    return this.prismaService.task.update({ where: { id }, data: data });
  }

  deleteTask(id: string) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
