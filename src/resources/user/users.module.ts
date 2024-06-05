import { Module, forwardRef } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserMapperProvider } from './userMapper.provider';
import { AuthModule } from 'src/auth/auth.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
	imports: [DatabaseModule, forwardRef(() => AuthModule), SecurityModule],
	controllers: [UsersController],
	providers: [UsersService, UserMapperProvider],
	exports: [UsersService, UserMapperProvider],
})
export class UsersModule {}
