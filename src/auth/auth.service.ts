import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/entities';
import { UsersService } from 'src/user/users.service';
import { SecurityService } from 'src/security/security.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private readonly userService: UsersService,
		private readonly securityService: SecurityService,
	) {}

	async login(dto: LoginDto) {
		const { hashedpassword, ...rest } = await this.validateUser(dto);

		const tokens = await this.generateTokenPair(rest);

		return { ...tokens };
	}

	async generateTokenPair(user: User) {
		// Fix "Issued At claim is invalid" error
		const issuedAt = Math.floor(Date.now() / 1000) - 60;
		const payload = { sub: user.id, user: user, iat: issuedAt };

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.config.get<string>('SECRET_REFRESH_TOKEN'),
			expiresIn: '15m',
		});

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.config.get<string>('SECRET'),
			expiresIn: '2h',
		});

		return { refreshToken, accessToken };
	}

	async validateUser(dto: LoginDto): Promise<any> {
		const user = await this.userService.getUserByEmail(dto.email);

		if (!user) {
			throw new NotFoundException(`User with email ${dto.email} not found`);
		}

		const isValidPassword = await this.securityService.compareData(
			dto.password,
			user.hashedpassword
		);

		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password');
		}

		return user;
	}

	async register(dto: RegisterDto) {
		const hash = await this.securityService.hashData(dto.password);

		const data = {
			email: dto.email,
			username: dto.username,
			firstname: dto.firstname,
			lastname: dto.lastname,
			hashedpassword: hash,
			role: 'user',
			status: 'active',
		};

		const newUser = await this.userService.createUser(data);

		const tokens = await this.generateTokenPair(newUser);

		return { ...tokens };
	}
}
