import { Injectable } from '@nestjs/common';

import { User } from 'src/entities';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { UserViewDto } from './dto/view-user.dto';

@Injectable()
export class UserMapperProvider {
	userToViewPaginationDto([users, count]: [
		user: User[],
		count: number,
	]): PaginationResult<UserViewDto> {
		const usersDto = users.map((u) => this.userToViewDto(u));
		const userViewResultDto = new PaginationResult<UserViewDto>(
			usersDto,
			count
		);

		return userViewResultDto;
	}

	userToViewDto(user: User): UserViewDto {
		const userViewDto = new UserViewDto();

		userViewDto.id = user.id;
		userViewDto.username = user.username;
		userViewDto.firstname = user.firstname;
		userViewDto.lastname = user.lastname;
		userViewDto.email = user.email;
		userViewDto.role = user.role;
		userViewDto.status = user.status;
		userViewDto.createdat = user.createdat;

		return userViewDto;
	}
}
