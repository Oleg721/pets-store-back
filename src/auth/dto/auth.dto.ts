import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail({}, { message: 'Must be a valid email address' })
	@IsNotEmpty({ message: 'Email should not be empty' })
	email: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	password: string;

	@IsString({ message: 'Please create username' })
	username: string;

	@MinLength(6, { message: 'Firstname cannot be less then 6 characters' })
	@IsString()
	firstname: string;

	@MinLength(6, { message: 'Lastname cannot be less then 6 characters' })
	@IsString()
	lastname: string;
}

export class LoginDto {
	@IsEmail()
	email: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	password: string;
}
