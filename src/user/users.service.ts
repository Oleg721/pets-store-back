import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
// Future improvements: create own Repository that will use typeorm repo inside
import { Repository } from 'typeorm';

import { User } from '../entities';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@Inject(User)
		private userRepository: Repository<User>
		// There are many different strategies to handle TypeORM transactions.
		// We recommend using the QueryRunner class because it gives full control over the transaction.
	) {}

	private toUserDto(user: User): UserDto {
    const { hashedpassword, ...rest } = user;
    return { ...rest };
  }

	// Get all users
	async getAllUsers(): Promise<UserDto[]> {
		const users = await this.userRepository.find();
		return users.map(this.toUserDto);
	}

	// Get user by ID
	async getUserById(id: number): Promise<UserDto> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) throw new NotFoundException(`User with ID ${id} not found`);

		return this.toUserDto(user);
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = this.userRepository.findOneBy({ email });

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return user;
	}

	// Update user by ID
	async updateUserById(id: number, data: UpdateUserDto): Promise<UserDto> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		const updatedUser = await this.userRepository.save({ ...user, ...data });
		return this.toUserDto(updatedUser);
	}

	// Create a new user
	async createUser(user: Partial<User>): Promise<User> {
		const oldUser = await this.getUserByEmail(user.email);

		if (oldUser) {
			throw new BadRequestException(`User with the email ${user.email} already exists!`);
		}

		return await this.userRepository.save(user);
	}

	// Delete user by ID
	// 200 if user deleted successfully
	async deleteUserById(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}
}
