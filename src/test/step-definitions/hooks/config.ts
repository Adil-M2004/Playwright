import * as dotenv from 'dotenv';

// This loads the variables from .env into process.env
dotenv.config();

export const config = {
    url: process.env.URL || 'https://default-url.com',
};