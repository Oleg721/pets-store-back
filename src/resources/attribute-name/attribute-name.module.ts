import { Module } from '@nestjs/common';

import { AttributeNameService } from './attribute-name.service';
import { AttributeNameController } from './attribute-name.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AttributeNameMapperProvider } from './attribute-name-mapper.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [AttributeNameController],
	providers: [AttributeNameService, AttributeNameMapperProvider],
	exports: [AttributeNameService],
})
export class AttributeNameModule {}
