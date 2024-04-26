import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../entities';

@Injectable()
export class UsersService {
	constructor(
		@Inject(User)
		private userRepository: Repository<User>
		// There are many different strategies to handle TypeORM transactions.
		// We recommend using the QueryRunner class because it gives full control over the transaction.
	) {}

	// Get all users
	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	// Get user by ID
	async getUserById(id: number): Promise<User> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) throw new NotFoundException(`User with ID ${id} not found`);

		return user;
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = this.userRepository.findOneBy({ email });

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return user;
	}

	// Update user by ID
	async updateUserById(id: number, data: Partial<User>): Promise<User> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		return await this.userRepository.save({ ...user, ...data });
	}

	// Create a new user
	async createUser(user: Partial<User>): Promise<User> {
		return await this.userRepository.save(user);
	}

	// Delete user by ID
	// 200 if user deleted successfully
	async deleteUserById(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}
}
