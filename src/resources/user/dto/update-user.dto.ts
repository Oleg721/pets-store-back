import { ApiProperty, PartialType } from '@nestjs/swagger';

import { RegisterDto } from 'src/auth/dto/auth.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
	@ApiProperty()
	username: string;

	@ApiProperty()
	firstname: string;

	@ApiProperty()
	lastname: string;
}
