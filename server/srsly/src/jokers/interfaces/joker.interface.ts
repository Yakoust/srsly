import { Document } from 'mongoose';

export interface Joke {
    readonly joke: string;
    readonly context: string;
    readonly date: Date;
}

export interface Joker extends Document {
    readonly name: string;
    readonly jokes?: Joke[];
}