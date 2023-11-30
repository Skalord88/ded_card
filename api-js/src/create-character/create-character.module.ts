import { Module } from '@nestjs/common';
import { CreateCharacterService } from './create-character.service';
import { CreateCharacterController } from './create-character.controller';

@Module({
  controllers: [CreateCharacterController],
  providers: [CreateCharacterService],
})
export class CreateCharacterModule {}
