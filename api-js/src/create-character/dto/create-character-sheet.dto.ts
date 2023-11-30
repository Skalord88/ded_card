import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCharacterSheetDto {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  name: string;
}
