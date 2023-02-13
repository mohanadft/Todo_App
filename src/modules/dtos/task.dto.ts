import { IsNotEmpty } from 'class-validator';

export class Task {
  @IsNotEmpty()
  title: string;

  description: string | undefined;
}
