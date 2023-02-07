import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: User) {
    return this.authService.signUp(data);
  }

  // what is the need for the first decorator?
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() data: User) {
    return this.authService.signIn(data);
  }
}
