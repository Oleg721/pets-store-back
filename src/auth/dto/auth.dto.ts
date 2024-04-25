import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail()
	email: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	hashedpassword: string;

	@IsString({ message: 'Please create username' })
	username: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	firstname: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	lastname: string;
}

export class LoginDto {
	@IsEmail()
	email: string;

	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@IsString()
	hashedpassword: string;
}
