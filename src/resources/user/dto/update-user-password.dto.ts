import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto  {
	@ApiProperty()
	password: string;
	@ApiProperty()
	oldPassword: string;
}
