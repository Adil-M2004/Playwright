/// <reference types="node" />

//Define a common command string for running cucumber tests
const common = `./src/test/features/*.feature \
  --require-module ts-node/register \
  --require ./src/test/step-definitions/**/**/*.ts \
  --require ./src/test/utils/cucumber-timeout.ts`;

//Define an interface for the profiles object
// it defines an interface where each key is a string and its value is also a string
interface ProfileCommands {
  [key: string]: string;
}

// Define command strings for different test profiles
const profiles: ProfileCommands = {
  smoke: `${common} --tags "@smoke"`,
  regression: `${common} --tags "@regression"`,
  login: `${common} --tags "@login"`,
  admin: `${common} --tags "@admin"`,
  deletion: `${common} --tags "@deletion"`,

}

//Get the third command-line argument and assign it to the profile
//i.e. smoke, regression etc
const profile = process.argv[2];


//Construct the command string based on the selected profile
//command is the full command to run the tests for the selected profile

let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regresssion' | 'login' | 'admin' | 'deletion']}`;

//Print the constructed command
console.log(command);
