import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from 'playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { config } from '../step-definitions/hooks/config';


When('the user clicks on the ADD button to add a new user', async () => {
    const nav = new NavigationPage(pageFixture.page);
    await nav.addUser.click();

    //ASSERTION TO CONFRIM USER HAS LANDED ON ADD USER PAGE
    const addUser = pageFixture.page.getByRole('heading', { name: 'Add User' });
    await expect(addUser).toBeVisible();
});

When('the user enters more than {int} characters into the username field', async (int) => {
    // 40 Characters string being used to exceed the limit
    await pageFixture.page.getByRole('textbox').nth(2).fill(config.FortyPlusString);

});

//ASSERSTION TO CHECK IF THE VALIDATION MESSAGE IS VISIBLE (Should not exceed 40 characters)
Then('the user sees a validation message for the username field', async () => {
    const validationMessage = pageFixture.page.getByText('Should not exceed 40'); // Wait for the validation 
    expect(validationMessage).toBeVisible();
});


When('the user enters weak password into password field', async () => {
    await pageFixture.page.getByRole('textbox').nth(3).fill(config.weakPassword);
});

//ASSERTION TO CHECK IF THE 'WEAK' PASSWORD MESSAGE IS VISIBLE 
Then('a message appears stating weak', async () => {
    const weakMessage = pageFixture.page.getByText('Weak'); // Wait for the "Weak" message to be visible
    await expect(weakMessage).toBeVisible();
});

//ASSERTION TO CHECK IF STATUS FIELD IS DEFAULTED TO "-- Select --"
Then('the Status field should be set to select by default', async () => {
    const statusField = pageFixture.page.locator('.oxd-select-text').first();
    await expect(statusField).toHaveText(config.selectField);
});

//ADD USER - INCOMPLETE
Then('the user sees the form for adding a user', async () => {
    const addUser = pageFixture.page.getByRole('heading', { name: 'Add User' });
    await expect(addUser).toBeVisible();
});






