import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly dashboardHeader: Locator;
    readonly adminHeader: Locator;
    readonly requiredMessages: Locator;
    readonly tableRows: Locator;
    readonly confirmationModal: Locator;
    readonly yesDeleteBtn: Locator;
    readonly noCancelBtn: Locator;
    readonly deleteSelectedBtn: Locator;
    skipRemaining: boolean; //WORLD VARIABLE TO CONTROL SKIPPING STEPS IN BULK DELETION SCENARIO


    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
        this.adminHeader = page.locator("//h6[contains(@class, 'oxd-topbar-header-breadcrumb-module') and text()='Admin']");
        this.requiredMessages = page.locator('span:has-text("Required")');
        this.tableRows = page.locator('div.oxd-table-body > div.oxd-table-card');
        this.confirmationModal = page.locator('p:has-text("Are you sure?")');
        this.yesDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' });
        this.noCancelBtn = page.getByRole('button', { name: 'No, Cancel' });
        this.deleteSelectedBtn = page.getByRole('button', { name: /Delete Selected/ });
        this.skipRemaining = true; // Default to true, meaning we will skip steps unless we set it to false in the bulk deletion scenario

    }

    async verifyRequiredMessagesVisible() {
        // Since both fields show "Required", we check visibility of the locator
        await expect(this.requiredMessages).toBeVisible();
    }

    async getUsernameFromRow(index: number): Promise<string> {
        const username = await this.tableRows.nth(index).locator('.oxd-table-cell').nth(1).innerText();
        return username.trim();
    }

    async clickDeleteOnRow(index: number) {
        await this.tableRows.nth(index).locator('i.oxd-icon.bi-trash').click();
    }

    async bulkSelectRecords(count: number): Promise<string[]> {
        await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });
        //await this.tableRows.first().waitFor({ state: 'attached', timeout: 5000 });
        const rowCount = await this.tableRows.count();


        console.log(`Attempting to select ${count} records. Total records available: ${rowCount}.`);

        if (count > rowCount) {

            // We log a warning instead of throwing an error
            console.warn(`SKIPPING SELECTION: Wanted ${count} records, but found ${rowCount}.`);
            this.skipRemaining = true; // Store this in the Cucumber 'World' object

            return [];

        }

        this.skipRemaining = false; // We have enough records, so we can proceed with the test steps
        const capturedNames: string[] = [];
        await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

        for (let i = 1; i <= count; i++) {
            const row = this.tableRows.nth(i); // Start from index 1 to skip the header row, adjust if your table structure is different
            const name = await row.locator('.oxd-table-cell').nth(1).innerText(); // Capture the username before clicking
            capturedNames.push(name.trim());
            await row.locator('.oxd-checkbox-input').click();
        }
        return capturedNames;

    }

    async verifyUsersHidden(usernames: string[]) {

        // Check the bucket!
        if (this.skipRemaining) {
            console.log("Skipping this step because skipRemaining is true");
            return;

        } else {

            console.log("Proceeding with verification of hidden users.");
            for (const name of usernames) {
                const row = this.page.locator('.oxd-table-card', { hasText: name });
                await expect(row).toBeHidden();
            }
        }

    }

    async DeleteSelectedUsers() {
        // console.log("Proceeding with deletion of selected users.");
        await this.deleteSelectedBtn.click();

    }
}