import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
	forwardRef,
} from '@nestjs/common';
// Future improvements: create own Repository that will use typeorm repo inside
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { User } from 'src/entities';
import { LoginResponseDto } from 'src/auth/dto/loginResponse.dto';
import { AuthService } from 'src/auth/auth.service';
import { SecurityService } from 'src/security/security.service';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';

@Injectable()
export class UsersService extends BaseCrudService<
	User,
	UpdateUserDto,
	RegisterDto
> {
	constructor(
		@Inject(User)
		private userRepository: Repository<User>,
		// There are many different strategies to handle TypeORM transactions.
		// We recommend using the QueryRunner class because it gives full control over the transaction.
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly securityService: SecurityService
	) {
		super(userRepository);
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOneBy({ email });

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return user;
	}

	// Create a new user
	async createUser(user: Partial<User>): Promise<User> {
		const oldUser = await this.getUserByEmail(user.email);

		if (oldUser) {
			throw new BadRequestException(
				`User with the email ${user.email} already exists!`
			);
		}

		return await this.userRepository.save(user);
	}

	async updateUser(id: number, updateDto: UpdateUserDto): Promise<LoginResponseDto> {
		const updatedUser = await super.update(id, updateDto)
		return this.authService.generateTokenPair(updatedUser);
	}

	async updatePassword(
		id: number,
		updateDto: UpdateUserPasswordDto
	): Promise<boolean> {
		const user = await this.findOne(id);
		if (!user) {
			throw new BadRequestException(`User with id: ${id} does not exist`);
		}

		const isValidPassword = await this.securityService.compareData(
			updateDto.oldPassword,
			user.hashedpassword
		);

		if (!isValidPassword) {
			throw new BadRequestException(`Wrong old password`);
		}

		const hashedPassword = await this.securityService.hashData(
			updateDto.password
		);
		const result = await this.userRepository.save({
			...user,
			hashedpassword: hashedPassword,
		});

		return !!result;
	}

	async updateEmail(
		id: number,
		updateDto: UpdateUserEmailDto
	): Promise<LoginResponseDto> {
		const user = await this.findOne(id);

		if (!user) {
			throw new BadRequestException(`User with id: ${id} does not exist`);
		}

		const isValidPassword = await this.securityService.compareData(
			updateDto.password,
			user.hashedpassword
		);

		if (!isValidPassword) {
			throw new BadRequestException(`Wrong password`);
		}

		const isEmailExist = await this.userRepository.existsBy({
			email: updateDto.email,
		});

		if (isEmailExist) {
			throw new NotFoundException(`Email ${updateDto.email} already exist`);
		}

		const updatedUser = await this.userRepository.save({
			...user,
			email: updateDto.email,
		});

		return this.authService.generateTokenPair(updatedUser);
	}
}
