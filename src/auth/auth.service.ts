import {
  BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { User } from 'src/entities/user.entity';
import { UserHelper } from 'src/utils/user_helper';
import { UsersService } from 'src/user/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwtService: JwtService,
		private readonly userHelper: UserHelper,
		private userService: UsersService,
	) {}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto);

		const tokens = await this.generateTokenPair(user.hashedpassword);

		return { user: this.userHelper.buildUserResponse(user), ...tokens };
	}

	async generateTokenPair(password: string) {
		const data = { password: password };

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: process.env.JWT_REFRESHES_EXPIRES_IN,
		});

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		return { refreshToken, accessToken };
	}

	async validateUser(dto: LoginDto): Promise<any> {
		if (!dto.email || !dto.hashedpassword) {
			throw new NotFoundException(`One of the field is missed`);
		}

		const user = await this.userRepository.findOneBy({ email: dto.email });

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
    const existingUser = await this.userRepository.findOneBy({ email: dto.email })

    if (existingUser) {
      throw new BadRequestException(`User with email ${dto.email} already exists`)
    }
    
    const newUser = await this.userService.createUser(dto);

    const tokens = await this.generateTokenPair(newUser.hashedpassword);

		return { user: this.userHelper.buildUserResponse(newUser), ...tokens };
  }
}
