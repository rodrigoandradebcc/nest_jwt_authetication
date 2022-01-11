import { Test, TestingModule } from '@nestjs/testing';
import { CodeValidateService } from './code-validate.service';

describe('CodeValidateService', () => {
  let service: CodeValidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeValidateService],
    }).compile();

    service = module.get<CodeValidateService>(CodeValidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
