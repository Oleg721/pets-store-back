import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
