import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserMapperProvider } from './userMapper.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [UsersController],
	providers: [UsersService, UserMapperProvider],
	exports: [UsersService],
})
export class UsersModule {}
