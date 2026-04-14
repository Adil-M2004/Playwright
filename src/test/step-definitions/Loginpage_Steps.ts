import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { faker } from '@faker-js/faker';
import { expect } from 'playwright/test';
import { Browser, chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; // 1. Import it


let browser: Browser;
const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'; //URL for login page(OrangeHRM demo site)


Given('I navigate to the login URL {string}', async (string) => {
  //Access URL
  await pageFixture.page.goto(url);
});


When('I click on the username field', async () => {
  //await page.pause();
  const username_box = await pageFixture.page.getByRole('textbox', { name: 'Username' })
  await username_box.click();
});

When('I type {string} into the username field', async (string) => {
  // const username_box = await pageFixture.page.getByRole('textbox', { name: 'Username' })
  // await username_box.fill(string);

  //Using the LoginPage POM class to access the username field
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.usernameInput.fill(string);       // 3. Use locator from POM
});

Then('the username field should contain {string}', async (string) => {
  const username_box = pageFixture.page.getByRole('textbox', { name: 'Username' })
  const value = await username_box.inputValue();
  if (value !== string) {
    throw new Error(`Expected username field to contain "${string}", but got "${value}"`);
  }
});

When('I click on the password field', async () => {
  const password_box = pageFixture.page.getByRole('textbox', { name: 'Password' })
  await password_box.click();

});

When('I type {string} into the password field', async (string) => {
  // const password_box = pageFixture.page.getByRole('textbox', { name: 'Password' })
  // await password_box.fill(string);

  //Using the LoginPage POM class to access the password field
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.passwordInput.fill(string);       // 3. Use locator from POM
});

When('i click on the login button', async () => {
  const login_button = pageFixture.page.getByRole('button', { name: 'Login' });
  await login_button.click();

});

//Cucumber Expressions //STILL NEED TO IMPLEMENT
When('I type specific name into the username field {word}', async (username: string) => {
  console.log(username)
});

When('I type a specific password into the password field {string}', async (password: string) => {
  console.log(password)
});



//Random Data - Faker
When('I type a random username into the username field', async () => {
  //Faker code here
  const randomUsername = faker.internet.username(); //CREATE A RANDOM USERNAME
  const username_box = await pageFixture.page.getByRole('textbox', { name: 'Username' }) //LOCATE THE USERNAME FIELD
  await username_box.fill(randomUsername);
});


When('I type a random password into the password field', async () => {
  //Faker code here
  const randomPassword = faker.internet.password();
  const password_box = await pageFixture.page.getByRole('textbox', { name: 'Password' }) //LOCATE THE USERNAME FIELD
  await password_box.fill(randomPassword);
});


//Scenario Outlines:///////////////////////////////////////////

//Invalid credentials validation
Then('I should see a validation message saying Invalid credentials', async () => {
  //FILL CODE HERE
  await pageFixture.page.waitForSelector('p:has-text("Invalid credentials")'); // Wait for the "Invalid credentials" message to be visible
});

//Required field validation message
Then('I should see a validation message saying Required', async () => {
  await pageFixture.page.waitForSelector('span:has-text("Required")'); // Wait for the "Required" message to be visible
});

//Dashboard validation message
Then('I should see a validation message saying Dashboard', async () => {
  await pageFixture.page.waitForSelector('h6:has-text("Dashboard")'); // Wait for the "Dashboard" message to be visible
});


// Login Validation
Then('the login page should be displayed', async () => {
  await expect(pageFixture.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  //await pageFixture.page.waitForSelector('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > h5'); // Wait for the "Dashboard" message to be visible
});

When('I close the browser tab', async () => {
  await pageFixture.page.close();

});


When('I reopen the application URL {string}', async (string) => {
  browser = await chromium.launch({ headless: false });
  pageFixture.context = await browser.newContext({ viewport: { width: 1280, height: 720 } }); //SIZE of the browser window
  pageFixture.page = await pageFixture.context.newPage();
  await pageFixture.page.goto(url);

});



Then('I should still be logged in and see the dashboard page with the title {string}', async (string) => {
  await pageFixture.page.waitForSelector('h6:has-text("Dashboard")'); // Wait for the dashboard title to be visible

});








