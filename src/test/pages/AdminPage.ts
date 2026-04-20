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
        const capturedNames: string[] = [];
        await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

        for (let i = 1; i <= count; i++) {
            const row = this.tableRows.nth(i);
            const name = await row.locator('.oxd-table-cell').nth(1).innerText();
            capturedNames.push(name.trim());
            await row.locator('.oxd-checkbox-input').click();
        }
        return capturedNames;
    }

    async verifyUsersHidden(usernames: string[]) {
        for (const name of usernames) {
            const row = this.page.locator('.oxd-table-card', { hasText: name });
            await expect(row).toBeHidden();
        }
    }
}