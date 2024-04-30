import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { UsersService } from 'src/user/users.service';

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
	constructor(private readonly usersService: UsersService) {}

	async transform(value: { email: string }) {
		const email = value.email;

		if (!email) {
			throw new BadRequestException(`Email should not be empty.`);
		}

		const userExists = await this.usersService.getUserByEmail(email);

		if (userExists) {
			throw new BadRequestException(`Email ${email} is already in use.`);
		}

		return value; // continue if unique
	}
}
