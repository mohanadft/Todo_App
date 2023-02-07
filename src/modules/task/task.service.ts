import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, UpdatedTaskOptions } from '../dtos/task.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async getTasks(userId: string) {
    return await this.prismaService.task.findMany({ where: { userId } });
  }

  async getTaskById(userId: string, taskId: string) {
    return await this.prismaService.task.findFirst({
      where: { id: taskId, userId },
    });
  }

  async addTask(userId: string, data: Task) {
    const task = await this.prismaService.task.create({
      data: {
        ...data,
        userId,
      },
    });

    return task;
  }

  async updateTask(userId: string, taskId: string, data: UpdatedTaskOptions) {
    const { description, title } = data;
    const task = await this.prismaService.task.updateMany({
      where: { id: taskId, userId },
      data: {
        description,
        title,
      },
    });
    return task;
  }

  async deleteTask(userId: string, taskId: string) {
    return await this.prismaService.task.deleteMany({
      where: { userId, id: taskId },
    });
  }
}
