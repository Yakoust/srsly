import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (): Promise<typeof mongoose> =>
        {
          const mongoose = require('mongoose');
          return await mongoose.connect('mongodb://johnsnow:wint3r@ds121182.mlab.com:21182/srsly', { useNewUrlParser: true });
        },
    },
];