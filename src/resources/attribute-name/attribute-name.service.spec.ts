import { Test, TestingModule } from '@nestjs/testing';
import { AttributeNameService } from './attribute-name.service';

describe('AttributeNameService', () => {
  let service: AttributeNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeNameService],
    }).compile();

    service = module.get<AttributeNameService>(AttributeNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
