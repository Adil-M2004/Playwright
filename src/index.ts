/// <reference types="node" />

//Define a common command string for running cucumber tests
const common = `./src/test/features/*.feature \
  --require-module ts-node/register \
  --require ./src/step-definitions/**/**/*.ts \
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

  }

const profile = process.argv[2];
