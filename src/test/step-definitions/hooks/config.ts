import * as dotenv from 'dotenv';

// This loads the variables from .env into process.env
dotenv.config();

export const config = {
    url: process.env.URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    username: "Admin",
    invalidUsername: "Admin12",
    nonExistentUserName: "fakeUser",
    nonExistentPassword: "fakePass",
    weakPassword: "password123",
    password: process.env.PASSWORD || "admin123",
    selectField: "-- Select --",
    FortyPlusString: "ThisIsAVeryLongUsernameExceedingTheLimittttt",
};


//URL Stored ONLY IN CONFIG FILE/ NOT IN .env
export const configTest = {
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
}
