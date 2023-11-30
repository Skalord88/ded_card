import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharacterController } from './create-character.controller';
import { CreateCharacterService } from './create-character.service';

describe('CreateCharacterController', () => {
  let controller: CreateCharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCharacterController],
      providers: [CreateCharacterService],
    }).compile();

    controller = module.get<CreateCharacterController>(
      CreateCharacterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
