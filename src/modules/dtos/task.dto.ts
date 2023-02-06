import { IsNotEmpty } from 'class-validator';

export class Task {
  @IsNotEmpty()
  title: string;

  description: string | undefined;
}

export class UpdatedTaskOptions {
  title: string | undefined;
  description: string | undefined;
}
