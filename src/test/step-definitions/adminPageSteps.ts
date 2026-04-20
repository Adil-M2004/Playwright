import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from 'playwright/test';
import { NavigationPage } from "../pages/NavigationPage";
import { AdminPage } from "../pages/AdminPage";

let deletedUsername: string;
let deletedUsernames: string[] = [];

// Don't use a global 'let adminPage' variable here.

const getAdminPage = () => {
    // Always create a fresh instance linked to the current pageFixture
    return new AdminPage(pageFixture.page);
};

// --- Navigation & Headers ---

Then('I should be logged in and see the dashboard page with the title Dashboard', async () => {
    await getAdminPage().dashboardHeader.waitFor();
    // const allPages = await pageFixture.context.pages();
    // pageFixture.page = allPages[allPages.length - 1];
    await pageFixture.page.bringToFront();
    await pageFixture.page.setViewportSize({ width: 1280, height: 720 });
});

Then('I click the Admin button on the sidebar', async () => {
    const nav = new NavigationPage(pageFixture.page);
    await nav.goToAdmin();
});

Then('I should see the Admin page with the title Admin', async () => {
    await expect(getAdminPage().adminHeader).toBeVisible();
});

// --- Validation Messages ---

Then('I should see a Required message for the password field', async () => {
    await getAdminPage().verifyRequiredMessagesVisible();
});

Then('I should see a Required message for the username field', async () => {
    await getAdminPage().verifyRequiredMessagesVisible();
});

// --- Deletion Scenarios ---

When('the user clicks the Trash Can delete icon on the third record in the Records Found list', async () => {
    const admin = getAdminPage();
    deletedUsername = await admin.getUsernameFromRow(2); // index 2 = 3rd record
    await admin.clickDeleteOnRow(2);
});

When('the user confirms the deletion in the Are you Sure? modal', async () => {
    const admin = getAdminPage();
    await expect(admin.confirmationModal).toBeVisible();
    await admin.yesDeleteBtn.click();
});

When('the user cancels the delection in the Are you Sure? modal', async () => {
    const admin = getAdminPage();
    await expect(admin.confirmationModal).toBeVisible();
    await admin.noCancelBtn.click();
});

Then('the user no longer sees that record in the Records Found list', async () => {
    const userElement = pageFixture.page.getByText(deletedUsername, { exact: true });
    await expect(userElement).toBeHidden();
});

Then('the user still sees that record in the Records Found list', async () => {
    const userElement = pageFixture.page.getByText(deletedUsername, { exact: true });
    await expect(userElement).toBeVisible();
});

// --- Self-Deletion Prevention ---

When('the user clicks the Trash Can delete icon of username Admin', async () => {
    await pageFixture.page.locator('.oxd-table-card')
        .filter({ has: pageFixture.page.locator('.oxd-table-cell').nth(1).getByText('Admin', { exact: true }) })
        .locator('i.bi-trash').click();
});

Then('the page should not display the confirmation modal with the message Are you Sure?', async () => {
    await expect(getAdminPage().confirmationModal).toBeHidden();
});

// --- Bulk Deletion ---

When('the user clicks on the checkboxes for the first {int} records under Records Found', async (count) => {
    deletedUsernames = await getAdminPage().bulkSelectRecords(count);
});

When('the user clicks Delete Selected button', async () => {
    await getAdminPage().deleteSelectedBtn.click();
});

Then('the user no longer sees those records', async () => {
    await getAdminPage().verifyUsersHidden(deletedUsernames);
});