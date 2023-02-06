import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
