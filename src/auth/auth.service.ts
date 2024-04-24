import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';

import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private jwtService: JwtService,
		private config: ConfigService,
		private userService: UsersService,
	) {}

	async login(dto: LoginDto) {
		if (!dto.email || !dto.hashedpassword) {
			throw new UnauthorizedException('Invalid data provided')
		}

		const user = await this.validateUser(dto);

		const tokens = await this.generateTokenPair(user);

		return { ...tokens };
	}

	async generateTokenPair(user: User) {
		const payload = { sub: user.id, user: user };

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
		if (!dto.email || !dto.hashedpassword) {
			throw new NotFoundException(`One of the field is missed`);
		}

		const user = await this.userService.getUserByEmail(dto.email);

		if (!user) {
			throw new NotFoundException(`User with email ${dto.email} not found`);
		}

		const isValidPassword = await bcryptjs.compare(
			dto.hashedpassword,
			user.hashedpassword
		);

		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password');
		}

		return user;
	}

	async register(dto: RegisterDto) {
		const existingUser = await this.userService.getUserByEmail(dto.email);

		if (existingUser) {
			throw new BadRequestException(`User with email ${dto.email} already exists`);
		}

		const newUser = await this.userService.createUser(dto);

		const tokens = await this.generateTokenPair(newUser);

		return { ...tokens };
	}
}
