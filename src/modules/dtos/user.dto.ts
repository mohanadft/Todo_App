import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SerializedUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}

export class UpdatedUserOptions {
  @IsEmail()
  email: string | undefined;

  password: string | undefined;
}
