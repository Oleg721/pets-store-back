import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Param,
	Patch,
	Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get() // /users
	async getAllUsers(): Promise<User[]> {
		console.log('controller getAllUsers');
		return this.usersService.getAllUsers();
	}

	@Get(':id') // /users/:id
	async getUserById(@Param('id') id: number): Promise<User | null> {
		return await this.usersService.getUserById(id);
	}

	@Put(':id')
	async updateUserById(
		@Param('id') id: number,
		@Body() data: Partial<User>
	): Promise<User> {
		return await this.usersService.updateUserById(id, data);
	}

	@Post()
	async createUser(@Body() data: User): Promise<User> {
		return await this.usersService.createUser(data);
	}

	@Delete(':id')
	async deleteUserById(@Param('id') id: number): Promise<void> {
		return await this.usersService.deleteUserById(id);
	}
}
