import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		// Consumes role from controller' guard
		const roles = this.reflector.get(Roles, context.getHandler());

		if (!roles) {
      // The default user' permissions role has been set
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (user?.role === roles) {
			return true;
		}

		return false;
	}
}
