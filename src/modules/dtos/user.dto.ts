import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdatedUserOptions {
  @IsEmail()
  email: string | undefined;

  password: string | undefined;
}
