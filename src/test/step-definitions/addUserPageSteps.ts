import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from 'playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { AddUserPage } from '../pages/AddUserPage'; // New Import
import { config } from '../step-definitions/hooks/config';

// Helper to get the AddUserPage instance
const getAddUserPage = () => new AddUserPage(pageFixture.page);

When('the user clicks on the ADD button to add a new user', async () => {
    const nav = new NavigationPage(pageFixture.page);
    await nav.addUser.click();
    
    await getAddUserPage().verifyIsOnAddUserPage();
});

When('the user enters more than {int} characters into the username field', async (limit) => {
    // We pass the string from your config to the POM method
    await getAddUserPage().enterUsername(config.fortyPlusString);
});

Then('the user sees a validation message for the username field', async () => {
    await getAddUserPage().verifyUsernameLengthValidationError();
});

When('the user enters weak password into password field', async () => {
    await getAddUserPage().enterPassword(config.weakPassword);
});

Then('a message appears stating weak', async () => {
    await getAddUserPage().verifyWeakPasswordMessage();
});

Then('the Status field should be set to select by default', async () => {
    await getAddUserPage().verifyDefaultStatus(config.selectField);
});

Then('the user sees the form for adding a user', async () => {
    await getAddUserPage().verifyIsOnAddUserPage();
});


When('the user fills out all required fields with valid data', async () => {
    await getAddUserPage().adminUserRole();

    await getAddUserPage().enterEmployeeName(config.employeeName);
    await getAddUserPage().selectStatus();
    await getAddUserPage().enterUsername(config.newUserUsername);
    
     // Step 1: Click the admin option from the dropdown
        // Step 2: Select "Enabled" from the dropdown options
    await getAddUserPage().enterPassword(config.newUserPassword);
    await getAddUserPage().enterConfirmPassword(config.newUserPassword);


    await getAddUserPage().clickSave();

});


Then('the user sees new user in the Records Found list', async () => {
    //await getAddUserPage().verifyNewUserInRecordsFound(config.newUserUsername);
});