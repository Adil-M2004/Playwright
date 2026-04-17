import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { config } from './hooks/config'; // Import the config 
import { expect } from 'playwright/test';
import { Browser, chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; // 1. Import it


let browser: Browser;


Given('I navigate to the login page', async () => {
  await pageFixture.page.goto(config.url);
  //ASSERTION TO CHECK LOGIN PAGE via header
  await expect(pageFixture.page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

// PRE-CONDITION
Given('I login as an admin', async () => {

  //naviagte to URL
  await pageFixture.page.goto(config.url);

  //Click Username field
  const username_box = pageFixture.page.getByRole('textbox', { name: 'Username' })
  await username_box.click();

  //Insert username 
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.usernameInput.fill(config.username);       // 3. Use locator from POM

  //Click password field
  const password_box = pageFixture.page.getByRole('textbox', { name: 'Password' })
  await password_box.click();

  //Insert password 
  const loginPage2 = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage2.passwordInput.fill(config.password);       // 3. Use locator from POM

  //Click Login Button
  const login_button = pageFixture.page.getByRole('button', { name: 'Login' });
  await login_button.click();

  //Click the Admin Button
  await pageFixture.page.click('a:has-text("Admin")');

});//END OF PRE CONDTION

When('I click on the username field', async () => {
  const username_box = await pageFixture.page.getByRole('textbox', { name: 'Username' })
  await username_box.click();

});

When('I type into the username field', async () => {
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.usernameInput.fill(config.username);       // 3. Use locator from POM
});

Then('the username field should contain the username', async () => {
  const username_box = pageFixture.page.getByRole('textbox', { name: 'Username' })
  const value = await username_box.inputValue();
  if (value !== config.username) {
    throw new Error(`Expected username field to contain "${config.username}", but got "${value}"`);
  }
});

When('I click on the password field', async () => {
  const password_box = pageFixture.page.getByRole('textbox', { name: 'Password' })
  await password_box.click();

});

When('I type into the password field', async () => {
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.passwordInput.fill(config.password);       // 3. Use locator from POM
});

When('i click on the login button', async () => {
  const login_button = pageFixture.page.getByRole('button', { name: 'Login' });
  await login_button.click();

});

//Cucumber Expressions - DYNAMIC USERNAME AND PASSWORD
When('I type a specific name into the username field {string}', async (username: string) => {
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.usernameInput.fill(username);       // 3. Use locator from POM
});

When('I type a specific password into the password field {string}', async (password: string) => {
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.passwordInput.fill(password);       // 3. Use locator from POM
  // await pageFixture.page.pause();
});


//Invalid credentials validation
Then('I should see a validation message saying Invalid credentials', async () => {
  //FILL CODE HERE
  await pageFixture.page.waitForSelector('p:has-text("Invalid credentials")'); // Wait for the "Invalid credentials" message to be visible
});

//Required field validation message
Then('I should see a validation message saying Required', async () => {
  await pageFixture.page.waitForSelector('span:has-text("Required")'); // Wait for the "Required" message to be visible
});


// Login Validation
Then('the login page should be displayed', async () => {
  await expect(pageFixture.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  //await pageFixture.page.waitForSelector('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > h5'); // Wait for the "Dashboard" message to be visible
});

When('I close the browser tab', async () => {
  await pageFixture.page.close();
});


When('I reopen the application', async () => {
  browser = await chromium.launch({ headless: false });
  pageFixture.context = await browser.newContext({ viewport: { width: 1280, height: 720 } }); //SIZE of the browser window
  pageFixture.page = await pageFixture.context.newPage();
  await pageFixture.page.goto(config.url);
});


//PASSWORD RESET MODAL
When('I click the Forget your password? link', async () => {
  await pageFixture.page.getByText('Forgot your password?').click();

});

Then('i should see a modal to reset password', async () => {
  // await pageFixture.page.pause();
  const resetPassword_title = pageFixture.page.getByRole('heading', { name: 'Reset Password' });
  await expect(resetPassword_title).toBeVisible();
});

//Non-existent User
When('the user types non-existent username into the usernanme field', async () => {
  //Click Username field
  const username_box = pageFixture.page.getByRole('textbox', { name: 'Username' })
  await username_box.click();

  //INSERT NON-EXISTENT USERNAME
  const loginPage = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage.usernameInput.fill(config.nonExistentUserName);       // 3. Use locator from POM


});

When('the user types non-existent password into the password field', async () => {
  //Click password field
  const password_box = pageFixture.page.getByRole('textbox', { name: 'Password' })
  await password_box.click();

  //INSERT NON-EXISTENT PASSWORD
  const loginPage2 = new LoginPage(pageFixture.page); // 2. Create instance
  await loginPage2.passwordInput.fill(config.nonExistentPassword);       // 3. Use locator from POM

});








