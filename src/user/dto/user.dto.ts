import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

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
  role: string;

  @IsString()
  status: string;

  @IsDate()
  createdat: Date;
}