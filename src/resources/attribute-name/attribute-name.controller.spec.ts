import { Test, TestingModule } from '@nestjs/testing';
import { AttributeNameController } from './attribute-name.controller';
import { AttributeNameService } from './attribute-name.service';

describe('AttributeNameController', () => {
  let controller: AttributeNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeNameController],
      providers: [AttributeNameService],
    }).compile();

    controller = module.get<AttributeNameController>(AttributeNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
