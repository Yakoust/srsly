import * as mongoose from 'mongoose';

export const JokerSchema = new mongoose.Schema({
    name: String,
    jokes: [
        {
            id: String,
            joke: String,
            context: String,
            date: Date
        }
        ]
});
