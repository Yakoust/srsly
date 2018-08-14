import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Joker } from './interfaces/joker.interface';
import { CreateJokerDto } from './dto/create-joker.dto';
import {UpdateJokerDto} from "./dto/update-joker.dto";
import {JokeDto} from "./dto/joke.dto";

@Injectable()
export class JokersService {
    constructor(@Inject('JokerModelToken') private readonly jokerModel: Model<Joker>) {}

    async create(createJokerDto: CreateJokerDto): Promise<Joker> {
        const createdJoker = new this.jokerModel(createJokerDto);
        return await createdJoker.save();
    }

    async findAll(): Promise<Joker[]> {
        return await this.jokerModel.find().exec();
    }

    async findById(id: string): Promise<Joker> {
        return await this.jokerModel.findById(id).exec();
    }

    async update(ID: string, updateJokerDto: UpdateJokerDto): Promise<Joker> {
        const joker = await this.jokerModel.findById(ID).exec();
        if (joker._id) {
            await this.jokerModel.findByIdAndUpdate(joker._id, updateJokerDto).exec();
            return await this.jokerModel.findById(joker._id).exec();
        }
        return null;
    }
    async delete(ID: string): Promise<string> {

            await this.jokerModel.findByIdAndRemove(ID).exec();
            return 'The joker has been deleted';

    }

    async createJoke(id: string, joke: JokeDto): Promise<string> {

        await this.jokerModel.findById(id).exec().then( joker => this.update(id,
                { name: joker.name,
                    jokes: joker.jokes ? [...joker.jokes, joke] : [joke]}));
        return 'The joke has been added';

    }
}