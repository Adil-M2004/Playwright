//Define a common command string for running cucumber tests
const common = `./src/test/features/*.feature \
  --require-module ts-node/register \
  --require ./src/step-definitions/**/**/*.ts \
  --require ./src/test/utils/cucumber-timeout.ts`;

  //Define an interface for the profiles object
  //it defines an inerface where each key is a string a nd its value is also a string
  interface ProfileCommands {
    [key: string]: string;
  }

  //Define a command strings for difference test profiles
  const profiles: ProfileCommands = {
    smoke: `${common} --tags "@smoke"`,
    regression: `${common} --tags "@regression"`,
    login: `${common} --tags "@login"`,
    admin: `${common} --tags "@admin"`,

  }

  //Get the third command-line argument and assign i to the profile
  //i.e. smoke, regression etc

  //NOT WORKING AT THE MOMENT (ERROR)
  //const profile = process.argv[2];