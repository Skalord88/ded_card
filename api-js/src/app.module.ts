import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCharacterModule } from './create-character/create-character.module';

@Module({
  imports: [CreateCharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
