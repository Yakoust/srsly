import { Module } from '@nestjs/common';
import {JokersModule} from './jokers/jokers.module';
@Module({
  imports: [JokersModule],
})
export class AppModule {}
