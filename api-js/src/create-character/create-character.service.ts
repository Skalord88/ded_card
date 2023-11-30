import { Injectable } from '@nestjs/common';
import { CreateCreateCharacterDto } from './dto/create-create-character.dto';
import { UpdateCreateCharacterDto } from './dto/update-create-character.dto';

@Injectable()
export class CreateCharacterService {
  create(createCreateCharacterDto: CreateCreateCharacterDto) {
    return 'This action adds a new createCharacter';
  }

  findAll() {
    return `This action returns all createCharacter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} createCharacter`;
  }

  update(id: number, updateCreateCharacterDto: UpdateCreateCharacterDto) {
    return `This action updates a #${id} createCharacter`;
  }

  remove(id: number) {
    return `This action removes a #${id} createCharacter`;
  }
}
