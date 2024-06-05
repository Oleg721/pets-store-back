import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/resources/user/users.module';
import { SecurityModule } from 'src/security/security.module';
import { JwtStrategy } from 'src/strategies/jwtStrategy';

@Module({
	imports: [
		ConfigModule.forRoot(),
		forwardRef(() => UsersModule),
		SecurityModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: { expiresIn: '2h' },
		}),
	],
	// JWT strategy extracts and attaches the user to the req
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
