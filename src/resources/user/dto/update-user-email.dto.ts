import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserEmailDto  {
	@MinLength(6, { message: 'Password cannot be less then 6 characters' })
	@ApiProperty()
	password: string;
	@IsEmail({}, { message: 'Must be a valid email address' })
	@ApiProperty()
	email: string;
}
