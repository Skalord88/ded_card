import { Controller, Post, Body } from '@nestjs/common';
import { CreateCharacterService } from './create-character.service';
import { CreateCharacterSheetDto } from './dto/create-character-sheet.dto';

@Controller('create-character')
export class CreateCharacterController {
  constructor(
    private readonly createCharacterService: CreateCharacterService,
  ) {}

  @Post()
  createCharacterSheet(
    @Body() createCharacterSheetDTO: CreateCharacterSheetDto,
  ) {
    return this.createCharacterService.create(createCreateCharacterDto);
  }
}
