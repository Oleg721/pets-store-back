import {
	Controller,
	Get,
	Body,
	Delete,
	Param,
	Patch,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { Pagination, PaginationDecorator } from 'src/decorators/Pagination.decorator';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { UserMapperProvider } from './userMapper.provider';
import { UserViewDto } from './dto/view-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly mapper: UserMapperProvider
	) {}

	@Get() // /users
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'size', required: false })
	async getAll(
		@PaginationDecorator() pagination: Pagination
	): Promise<PaginationResult<UserViewDto>> {
		const [data, count] = await this.usersService.findAll({ ...pagination });

		const total = pagination ? count : undefined;
		return this.mapper.userToViewPaginationDto([data, total] as [
			User[],
			number,
		]);
	}

	@Get(':id') // /users/:id
	async getUserById(@Param('id') id: number): Promise<UserViewDto | null> {
		const user = await this.usersService.findOne(id);
		return this.mapper.userToViewDto(user);
	}

	@Patch(':id')
	async update(
		@Param('id') id: number,
		@Body() data: UpdateUserDto
	): Promise<UserViewDto> {
		const user = await this.usersService.update(id, data);
		return this.mapper.userToViewDto(user);
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.usersService.remove(id);
	}
}
