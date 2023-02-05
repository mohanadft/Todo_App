import { PrismaClient } from '@prisma/client';
import config from '../config/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: config().database_url,
        },
      },
    });
  }
}
