import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from 'playwright/test';
import { NavigationPage } from '../pages/NavigationPage';


//MAXIUM CHARACTER LIMIT VALIDATION FOR USERNAME FIELD*****************************************
When('the user clicks on the ADD button to add a new user', async () => {
    //await pageFixture.page.getByRole('button', { name: 'Add' }).click();

    //Using the NavigationPage POM class to access the Add button
    const nav = new NavigationPage(pageFixture.page);
    await nav.addUser.click();
});

When('the user enters more than {int} characters into the username field', async (int) => {
    // 40 Characters string being used to exceed the limit
    await pageFixture.page.getByRole('textbox').nth(2).fill('ThisIsAVeryLongUsernameExceedingTheLimittttt');

});
//ASSERSTION TO CHECK IF THE VALIDATION MESSAGE IS VISIBLE (Should not exceed 40 characters)
Then('the user sees a validation message for the username field', async () => {
    // await pageFixture.page.pause();
    const validationMessage = pageFixture.page.getByText('Should not exceed 40'); // Wait for the validation 
    expect(validationMessage).toBeVisible();
});



//Passowrd Secuity Validation*******************************************
When('the user enters {string} into password field', async (string) => {
    await pageFixture.page.getByRole('textbox').nth(3).fill(string);
});

//ASSERTION TO CHECK IF THE WEAK PASSWORD MESSAGE IS VISIBLE - NEED WORKED ON
Then('a message is appears stating weak', async () => {
    const weakMessage = pageFixture.page.getByText('Weak'); // Wait for the "Weak" message to be visible
    await expect(weakMessage).toBeVisible();
});

//ASSERTION TO CHECK IF STATUS FIELD IS DEFAULTED TO "-- Select --"
Then('the Status field should be set to {string} by default', async (string) => {
    const statusField = pageFixture.page.locator('.oxd-select-text').first();
    await expect(statusField).toHaveText(string);
});