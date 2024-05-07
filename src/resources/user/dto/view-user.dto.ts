import { Role } from 'src/entities/user.entity';

export class UserViewDto {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	role: Role;
	status: string;
	createdat: Date;
}
