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
	async update(
		@Param('id') id: number,
		@Body() data: UpdateUserDto
	): Promise<UserViewDto> {
		const user = await this.usersService.update(id, data);
		return this.mapper.userToViewDto(user);
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
