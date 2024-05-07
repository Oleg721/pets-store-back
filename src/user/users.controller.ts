import {
	Controller,
	Get,
	Body,
	Delete,
	Param,
	UseGuards,
	Patch,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from '../entities';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/entities/user.entity';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('jwt') // Requires JWT authorization
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get() // /users
	@UseGuards(JwtAuthGuard) // Protect controller with JwtAuthGuard
	async getAllUsers(): Promise<UserDto[]> {
		console.log('controller getAllUsers');
		return this.usersService.getAllUsers();
	}

	@Get(':id') // /users/:id
	async getUserById(@Param('id') id: number): Promise<UserDto | null> {
		return await this.usersService.getUserById(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([UserRole.ADMIN, UserRole.USER])
	async updateUserById(
		@Param('id') id: number,
		@Body() data: UpdateUserDto
	): Promise<UserDto> {
		return await this.usersService.updateUserById(id, data);
	}

	@Delete(':id')
	// For an example
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([UserRole.USER])
	async deleteUserById(@Param('id') id: number): Promise<void> {
		return await this.usersService.deleteUserById(id);
	}
}
