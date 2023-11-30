import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharacterService } from './create-character.service';

describe('CreateCharacterService', () => {
  let service: CreateCharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCharacterService],
    }).compile();

    service = module.get<CreateCharacterService>(CreateCharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
