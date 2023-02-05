import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('test_route')
  test() {
    return 'Testing';
  }
}
