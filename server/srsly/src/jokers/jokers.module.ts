import { Module } from '@nestjs/common';
import { JokersController } from './jokers.controller';
import { JokersService } from './jokers.service';
import { jokersProviders } from './jokers.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [JokersController],
    providers: [JokersService, ...jokersProviders],
})
export class JokersModule {}