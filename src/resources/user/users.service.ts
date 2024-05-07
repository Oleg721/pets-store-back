import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
// Future improvements: create own Repository that will use typeorm repo inside
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { User } from 'src/entities';

@Injectable()
export class UsersService extends BaseCrudService<User, UpdateUserDto, RegisterDto> {
	constructor(
		@Inject(User)
		private userRepository: Repository<User>
		// There are many different strategies to handle TypeORM transactions.
		// We recommend using the QueryRunner class because it gives full control over the transaction.
	) {
		super(userRepository);
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = this.userRepository.findOneBy({ email });

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return user;
	}

	// Create a new user
	async createUser(user: Partial<User>): Promise<User> {
		const oldUser = await this.getUserByEmail(user.email);

		if (oldUser) {
			throw new BadRequestException(`User with the email ${user.email} already exists!`);
		}

		return await this.userRepository.save(user);
	}
}
