import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class User {
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SerializedUser {
  id: string;

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
