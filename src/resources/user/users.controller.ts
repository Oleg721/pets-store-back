import {
	Controller,
	Get,
	Body,
	Delete,
	Param,
	Patch,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { Pagination, PaginationDecorator } from 'src/decorators/Pagination.decorator';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { UserMapperProvider } from './userMapper.provider';
import { UserViewDto } from './dto/view-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entities/user.entity';
import { CheckSelfGuard } from 'src/guards/check-self.guard';
import { CheckSelf } from 'src/decorators/check-self.decorator';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { LoginResponseDto } from 'src/auth/dto/loginResponse.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('jwt') // Requires JWT authorization
@UseGuards(JwtAuthGuard, CheckSelfGuard)
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly mapper: UserMapperProvider
	) {}

	@Get() // /users
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	@UseGuards(JwtAuthGuard) // Protect controller with JwtAuthGuard
	async getAll(
		@PaginationDecorator() pagination: Pagination
	): Promise<PaginationResult<UserViewDto>> {
		const users = await this.usersService.findAll({ ...pagination });

		return this.mapper.userToViewPaginationDto(
			users as [User[], number],
			!!pagination
		);
	}

	@Get(':id') // /users/:id
	async getUserById(@Param('id') id: number): Promise<UserViewDto | null> {
		const user = await this.usersService.findOne(id);
		return this.mapper.userToViewDto(user);
	}

	@Patch(':id')
	@CheckSelf('id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([Role.ADMIN, Role.USER])
	update(
		@Param('id') id: number,
		@Body() data: UpdateUserDto
	): Promise<LoginResponseDto> {
		return this.usersService.updateUser(id, data);
	}

	@Patch(':id/password')
	@CheckSelf('id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([Role.ADMIN, Role.USER])
	updatePassword(
		@Param('id') id: number,
		@Body() data: UpdateUserPasswordDto
	): Promise<boolean> {
		return this.usersService.updatePassword(id, data);
	}

	@Patch(':id/email')
	@CheckSelf('id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([Role.ADMIN, Role.USER])
	updateEmail(
		@Param('id') id: number,
		@Body() data: UpdateUserEmailDto
	): Promise<LoginResponseDto> {
		return this.usersService.updateEmail(id, data);
	}

	@Delete(':id')
	// For an example
	@CheckSelf('id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([Role.USER])
	remove(@Param('id') id: number): Promise<void> {
		return this.usersService.remove(id);
	}
}
