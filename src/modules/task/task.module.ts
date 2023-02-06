import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  providers: [TaskService, PrismaService],
  controllers: [TaskController],
})
export class TaskModule {}
