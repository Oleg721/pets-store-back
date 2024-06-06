import { ApiProperty } from '@nestjs/swagger';
import { IsNotEqual } from 'src/common/validator/isNotEqual.validator';

export class UpdateUserPasswordDto {
	@ApiProperty()
	@IsNotEqual('oldPassword', {
		message: 'Password should not be the same as old password',
	})
	password: string;
	@ApiProperty()
	oldPassword: string;
}
