import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/users.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: '2h' },
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
