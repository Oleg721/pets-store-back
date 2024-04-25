import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { UsersService } from 'src/user/users.service';
import { AuthController } from './auth.controller';
import { UsersController } from 'src/user/users.controller';
import { User } from 'src/entities/user.entity';

@Module({
	imports: [
    ConfigModule.forRoot(),
		TypeOrmModule.forFeature([User]),
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: '2h' },
		}),
	],
  providers: [AuthService, UsersService],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
