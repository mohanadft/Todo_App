import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
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
}