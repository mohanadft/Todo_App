import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;

  constructor(@Inject('CONFIG_OPTIONS') options: Record<string, any>) {
    const envFile = path.resolve(__dirname, '../../../', options.file);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    console.log(this.envConfig);
    return this.envConfig[key];
  }
}
