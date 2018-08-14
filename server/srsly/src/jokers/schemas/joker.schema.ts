import { Schema } from 'mongoose';

export const JokerSchema = new Schema({
    name: String,
    jokes: [
        {
            joke: String,
            context: String,
            date: Date,
        },
        ],
});
