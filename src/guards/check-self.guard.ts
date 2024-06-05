import {
	CanActivate,
	ExecutionContext,
	Injectable,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CheckSelfGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const currentUserId = request.user.id;

		const paramKey = this.reflector.get<string>(
			'checkSelf',
			context.getHandler()
		);

		if (paramKey) {
			const paramValue = request.params[paramKey];

			if (currentUserId != paramValue) {
				throw new ForbiddenException(
					'You cannot perform this action on yourself.'
				);
			}
		}

		return true;
	}
}
