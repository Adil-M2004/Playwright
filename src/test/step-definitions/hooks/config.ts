import * as dotenv from 'dotenv';

// This loads the variables from .env into process.env
dotenv.config();

export const config = {
    url: process.env.URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
};

export const pass = {
    password: process.env.PASSWORD || "admin123",
};


