import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail({}, { message: 'Must be a valid email address' })
	@IsNotEmpty({ message: 'Email should not be empty' })
	@ApiProperty()
	email: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	@ApiProperty()
	password: string;

	@IsString({ message: 'Please create username' })
	@ApiProperty()
	username: string;

	@MinLength(6, { message: 'Firstname cannot be less then 6 characters' })
	@IsString()
	@ApiProperty()
	firstname: string;

	@MinLength(6, { message: 'Lastname cannot be less then 6 characters' })
	@IsString()
	@ApiProperty()
	lastname: string;
}

export class LoginDto {
	@IsEmail()
	@ApiProperty()
	email: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	@ApiProperty()
	password: string;
}
