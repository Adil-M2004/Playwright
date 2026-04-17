import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from 'playwright/test';
import { NavigationPage } from "../pages/NavigationPage";

let deletedUsername: string;
let deletedUsernames: string[] = [];



Then('I should be logged in and see the dashboard page with the title Dashboard', async () => {
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
    const nav = new NavigationPage(pageFixture.page);
    await nav.goToAdmin();
});


Then('I should see a Required message for the password field', async () => {
    const passwordRequired = pageFixture.page.locator('span:has-text("Required")'); // Wait for the "Required" message to be visible
    await expect(passwordRequired).toBeVisible();
});

Then('I should see a Required message for the username field', async () => {
    const passwordRequired = pageFixture.page.locator('span:has-text("Required")'); // Wait for the "Required" message to be visible
    await expect(passwordRequired).toBeVisible();
});

//XPATH Locator
Then('I should see the Admin page with the title Admin', async () => {
    const adminHeader = pageFixture.page.locator("//h6[contains(@class, 'oxd-topbar-header-breadcrumb-module') and text()='Admin']");
    await expect(adminHeader).toBeVisible();
});

//Scenario: Delete Record from Admin Page
When('the user clicks the Trash Can delete icon on the third record in the Records Found list', async () => {
   // 1. Define the locator for the username in the 3rd row
  // Adjust the selector '.oxd-table-cell' to match your specific column
  const thirdRowUsernameLocator = pageFixture.page.locator('div.oxd-table-body > div.oxd-table-card:nth-child(3) .oxd-table-cell').nth(1);

  // 2. Get the text and store it
  deletedUsername = await thirdRowUsernameLocator.innerText();
  console.log(`Deleting user: ${deletedUsername}`);

  // 3. Click the delete icon in the 3rd row
  await pageFixture.page.locator('div.oxd-table-body i.oxd-icon.bi-trash').nth(2).click();
  

});

When('the user confirms the deletion in the Are you Sure? modal', async () => {
    const confirmationMessage = pageFixture.page.locator('p:has-text("Are you sure?")'); // Wait for the confirmation message to be visible
    await expect(confirmationMessage).toBeVisible();

    //Confirms DELETION
    await pageFixture.page.getByRole('button', { name: 'Yes, Delete' }).click();
});

When('the user cancels the delection in the Are you Sure? modal', async () => {
    const confirmationMessage = pageFixture.page.locator('p:has-text("Are you sure?")'); // Wait for the confirmation message to be visible
    await expect(confirmationMessage).toBeVisible();

    //Cancels DELETION
    await pageFixture.page.getByRole('button', { name: 'No, Cancel' }).click();
});


Then('the user no longer sees that record in the Records Found list', async () => {
  const deletedUserElement = pageFixture.page.getByText(deletedUsername, { exact: true });
  await expect(deletedUserElement).toBeHidden();

});

//Admin conneot self-deletion scenario
When('the user clicks the Trash Can delete icon of username Admin', async () => {
    await pageFixture.page
        .locator('.oxd-table-card')
        // Ensure the cell in the username column (usually index 1) matches exactly
        .filter({ has: pageFixture.page.locator('.oxd-table-cell').nth(1).getByText('Admin', { exact: true }) })
        .locator('i.bi-trash')
        .click();
});

Then('the page should not display the confirmation modal with the message Are you Sure?', async () => {
    const confirmationMessage = pageFixture.page.locator('p:has-text("Are you sure?")'); // Check for the presence of the confirmation message
    await expect(confirmationMessage).toBeHidden();// Should NOT be visible since the user is trying to delete their own account
});




Then('the user still sees that record in the Records Found list', async () => {
    const deletedUserElement = pageFixture.page.getByText(deletedUsername, { exact: true });
  
  await expect(deletedUserElement).toBeVisible();
});

//BULK DELETION
When('the user clicks on the checkboxes for the first {int} records under Records Found', async (count) => {
    const rows = pageFixture.page.locator('div.oxd-table-body > div.oxd-table-card');
    await pageFixture.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

    const rowCount = await rows.count();
    console.log(`Quantity of records found: ${rowCount}`);

    // We reset the array for every new test run
    
    if (rowCount >= 4) {
        const rowStart = 1; // 2nd row (index 1)
        const rowEnd = 3;   // 4th row (index 3)

        for (let i = rowStart; i <= rowEnd; i++) {
            const currentRow = rows.nth(i);
            
            // 1. CAPTURE the username before clicking
            // Adjust the selector '.oxd-table-cell' to the specific column index for Username
            const username = await currentRow.locator('.oxd-table-cell').nth(1).innerText(); 
            deletedUsernames.push(username.trim());

            // 2. CLICK the checkbox
            await currentRow.locator('.oxd-checkbox-input').click();
        }
        console.log(`Captured for deletion: ${deletedUsernames.join(", ")}`);

    } else {
        throw new Error("CRITICAL FAILURE: Not ENOUGH records found.");
    }
});

//ASSERTION FOR BULK DELETION
Then('the user no longer sees those records', async () => {
    for (const username of deletedUsernames) {
        // We use a locator that looks for the text specifically
        const isVisible = await pageFixture.page
            .locator('.oxd-table-card', { hasText: username })
            .isVisible();
            
        if (isVisible) {
            throw new Error(`Assertion Failed: User ${username} is still visible after bulk deletion!`);
        }
    }
    console.log("Bulk deletion verified successfully.");
});

When('the user clicks Delete Selected button', async () => {
   await pageFixture.page.getByRole('button', { name: ' Delete Selected' }).click();
});







