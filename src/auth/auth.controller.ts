import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UniqueEmailPipe } from 'src/pipes/UniqueEmail.pipe';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('login')
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}

  @Post('register')
	@UsePipes(UniqueEmailPipe)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
