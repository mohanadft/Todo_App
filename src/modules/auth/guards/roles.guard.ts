import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    console.log('roles', roles);

    const request = await context.switchToHttp().getRequest();
    const user = await request.user;

    console.log(user);

    return roles.some((role) => user.roles?.includes(role));
  }
}
