import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '../entities/user.entity';
import { RegisterDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		// There are many different strategies to handle TypeORM transactions.
		// We recommend using the QueryRunner class because it gives full control over the transaction.
		private dataSource: DataSource
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

	// Update user by ID
	async updateUserById(id: number, data: Partial<User>): Promise<User> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		return await this.userRepository.save({ ...user, ...data });
	}

	// Create a new user
	async createUser(dto: RegisterDto): Promise<User> {
		if (!dto.email) {
			throw new BadRequestException(`No email address is provided!`);
		}

		const oldUser = await this.userRepository.findOneBy({
			email: dto.email,
		});

		if (oldUser) {
			throw new BadRequestException(
				`User with the email ${dto.email} already exists!`
			);
		}

		const salt = await bcrypt.genSalt(10);

		const newUser = {
			email: dto.email,
			username: dto.username,
			firstname: dto.firstname,
			lastname: dto.lastname,
			hashedpassword: await bcrypt.hash(dto.hashedpassword, salt),
			role: 'user',
			status: 'active',
		};

		return await this.userRepository.save(newUser);
	}

	// Delete user by ID
	// 200 if user deleted successfully
	async deleteUserById(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}
}
