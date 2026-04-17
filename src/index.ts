import { exec } from "child_process";

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
    loginPage: `${common} --tags "@loginPage"`,
    admin: `${common} --tags "@admin"`,
    deletion: `${common} --tags "@deletion"`,
    exampleTag: `${common} --tags "@example-tag"`,
    deletionConfirmation: `${common} --tags "@deletionConfirmation"`,
    selfDeletion: `${common} --tags "@selfDeletion"`,
    cancelDeletion: `${common} --tags "@CancelDeletion"`,
    bulkDeletion: `${common} --tags "@bulkDeletion"`,
    maxLength: `${common} --tags "@maxLength"`,
    securityStrength: `${common} --tags "@securityStrength"`,
    statusField: `${common} --tags "@statusField"`,
    fieldElements: `${common} --tags "@fieldElements"`,
    validLogin: `${common} --tags "@validLogin"`,
    nonExistentUser: `${common} --tags "@NonExistentUser"`,
    invalidLogin: `${common} --tags "@invalidLogin"`,
    emptyPassword: `${common} --tags "@emptyPassword"`,
    emptyUsername: `${common} --tags "@emptyUsername"`,
    emptyFields: `${common} --tags "@emptyFields"`,
    passwordReset: `${common} --tags "@passwordReset"`,
    session: `${common} --tags "@session"`,
    loginAssertion: `${common} --tags "@loginAssertion"`,

  }

  //Get the third command-line argument and assign it to the profile
  //i.e. smoke, regression etc
 const profile = process.argv[2];


 //Construct the command string based on the selected profile
 //command is the full command to run the tests for the selected profile

 let command = `npx cucumber-js ${profiles[profile as keyof ProfileCommands] || profiles[profile as 'smoke' | 'regression' | 'login' | 'admin' | 'deletion']}`;

 //Print the constructed command
// console.log(command);

//Execute the command
exec(command, { encoding: 'utf-8'}, (error: Error | null, stdout: string)=>{
    //Log the output of the command
    console.log(stdout);

    //check if there was an error during execution
    if(error) {
      //throw a new error with a simple mssage
      throw new Error('⚠️ 💥 Some automation test(s) have failed! - Please review. ⚠️ 💥 ')
    }
});