import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from 'playwright/test';
import { NavigationPage } from "../pages/NavigationPage";



Then('I should be logged in and see the dashboard page with the title {string}', async (string) => {
    await pageFixture.page.waitForSelector('h6:has-text("Dashboard")'); // Wait for the dashboard title to be visible

    //Retrieve all the current open pages (tabs)
    const allPages = await pageFixture.context.pages();

    //Assign the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length - 1];

    //Bring the newly assgined tab to the front (Make it active)
    await pageFixture.page.bringToFront();

    //Ensure the newly assigned tab is also fully maxiumised
    await pageFixture.page.setViewportSize({ width: 1280, height: 720 });

});


Then('I click the Admin button on the sidebar', async () => {
    // await pageFixture.page.click('a:has-text("Admin")');
    // const adminHeader = pageFixture.page.locator("//h6[contains(@class, 'oxd-topbar-header-breadcrumb-module') and text()='Admin']");
    const nav = new NavigationPage(pageFixture.page);
    await nav.goToAdmin();
});


Then('I should see a Required message for the password field', async () => {
    const passwordRequired = pageFixture.page.locator('span:has-text("Required")'); // Wait for the "Required" message to be visible
    await expect(passwordRequired).toBeVisible();
});

Then('I should see the Admin page with the title Admin', async () => {
    const adminHeader = pageFixture.page.locator("//h6[contains(@class, 'oxd-topbar-header-breadcrumb-module') and text()='Admin']");
    await expect(adminHeader).toBeVisible();
});


//Scenario: Delete Record from Admin Page
When('the user clicks the Trash Can delete icon on the first record in the Records Found list', async () => {
   // await pageFixture.page.pause();

    await pageFixture.page.click('div.oxd-table-body > div:first-child i.oxd-icon.bi-trash'); // Click the trash can icon for the first record
    //await pageFixture.page.locator('div:nth-child(3) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button').first().click(); // Click the trash can icon for the first record

});

Then('the user sees a confirmation modal with the message Are you Sure?', async () => {
    const confirmationMessage = pageFixture.page.locator('p:has-text("Are you sure?")'); // Wait for the confirmation message to be visible
    await expect(confirmationMessage).toBeVisible();
});

When('the user clicks the Yes, Delete red button', async () => {
    await pageFixture.page.getByRole('button', { name: 'Yes, Delete' }).click();
});


Then('the user no longer sees that record in the Records Found list', async () => {
    // assertionm to confirm record is NOT Visible
    const deletedRecord = pageFixture.page.locator('div.oxd-table-body > div:first-child');
    await expect(deletedRecord).not.toHaveText('Admin'); // Replace 'Admin' with the specific text of the deleted record
    
});




