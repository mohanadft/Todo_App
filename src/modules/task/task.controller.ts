import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  @Get('test_route')
  test() {
    return 'Testing';
  }
}
