import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;
}
