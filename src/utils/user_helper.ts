import { User } from "src/entities/user.entity";

export class UserHelper {
	constructor() {}

	buildUserResponse(user: User) {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			status: user.status,
			role: user.role,
			createdat: user.createdat,
		};
	}
}
