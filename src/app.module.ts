import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      file: '.env',
    }),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
