import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserHelper } from 'src/utils/user_helper';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/user/users.service';

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
  providers: [AuthService, UserHelper, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
