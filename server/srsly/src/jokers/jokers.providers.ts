
import { Connection } from 'mongoose';
import { JokerSchema } from './schemas/joker.schema';

export const jokersProviders = [
    {
        provide: 'JokerModelToken',
        useFactory: (connection: Connection) => connection.model('Joker', JokerSchema),
        inject: ['DbConnectionToken'],
    },
];