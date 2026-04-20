import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { config } from './hooks/config';
import { expect, chromium } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { NavigationPage } from "../pages/NavigationPage";

// Helper to keep the code DRY
const getLoginPage = () => new LoginPage(pageFixture.page);

Given('I navigate to the login page', async () => {
    await getLoginPage().navigateTo(config.url);
    await expect(getLoginPage().loginHeader).toBeVisible();
});

Given('I login as an admin', async () => {
    const loginPage = getLoginPage();
    const nav = new NavigationPage(pageFixture.page);

    await loginPage.navigateTo(config.url);
    await loginPage.login(config.username, config.password);
    
    // Using existing NavigationPage for the sidebar click
    await nav.goToAdmin(); //this mabye not working!!!

});

When('I click on the username field', async () => {
    await getLoginPage().usernameInput.click();
});

When('I type into the username field', async () => {
    await getLoginPage().usernameInput.fill(config.username);
});

Then('the username field should contain the username', async () => {
    const value = await getLoginPage().usernameInput.inputValue();
    expect(value).toBe(config.username);
});

When('I click on the password field', async () => {
    await getLoginPage().passwordInput.click();
});

When('I type into the password field', async () => {
    await getLoginPage().passwordInput.fill(config.password);
});

When('i click on the login button', async () => {
    await getLoginPage().loginButton.click();
});

// Dynamic Steps (Cucumber Expressions)
When('I type a specific name into the username field {string}', async (username: string) => {
    await getLoginPage().usernameInput.fill(username);
});

When('I type a specific password into the password field {string}', async (password: string) => {
    await getLoginPage().passwordInput.fill(password);
});

// Validations
Then('I should see a validation message saying Invalid credentials', async () => {
    await expect(getLoginPage().invalidCredentialsMessage).toBeVisible();
});

Then('I should see a validation message saying Required', async () => {
    await expect(getLoginPage().requiredMessage.first()).toBeVisible();
});

Then('the login page should be displayed', async () => {
    await expect(getLoginPage().loginHeader).toBeVisible();
});

// Browser/Tab Control
When('I close the browser tab', async () => {
    await pageFixture.page.close();
});

When('I reopen the application', async () => {
    // Note: Re-launching the browser mid-test is usually handled by hooks, 
    // but keeping your logic here:
    pageFixture.page = await pageFixture.context.newPage();
    await pageFixture.page.goto(config.url);
});

// Password Reset
When('I click the Forget your password? link', async () => {
    await getLoginPage().forgotPasswordLink.click();
});

Then('i should see a modal to reset password', async () => {
    await expect(getLoginPage().resetPasswordHeader).toBeVisible();
});

// Negative Testing
When('the user types non-existent username into the username field', async () => {
    await getLoginPage().usernameInput.fill(config.nonExistentUserName);
});

When('the user types non-existent password into the password field', async () => {
    await getLoginPage().passwordInput.fill(config.nonExistentPassword);
});