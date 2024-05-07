import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { Role } from 'src/entities/user.entity';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  role: Role;

  @IsString()
  status: string;

  @IsDate()
  createdat: Date;
}