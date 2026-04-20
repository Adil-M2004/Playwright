import { Page, Locator, expect } from '@playwright/test';

export class AddUserPage {
    readonly page: Page;
    readonly addUserHeader: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly usernameLengthError: Locator;
    readonly weakPasswordMessage: Locator;
    readonly statusDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addUserHeader = page.getByRole('heading', { name: 'Add User' });
        // Keeping nth(x) logic, but encapsulated here for easier future updates
        this.usernameInput = page.getByRole('textbox').nth(2); //Make robust
        this.passwordInput = page.getByRole('textbox').nth(3); //MAke robust
        this.usernameLengthError = page.getByText('Should not exceed 40');
        this.weakPasswordMessage = page.getByText('Weak');
        this.statusDropdown = page.locator('.oxd-select-text').first();
    }

    async verifyIsOnAddUserPage() {
        await expect(this.addUserHeader).toBeVisible();
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async verifyUsernameLengthValidationError() {
        await expect(this.usernameLengthError).toBeVisible();
    }

    async verifyWeakPasswordMessage() {
        await expect(this.weakPasswordMessage).toBeVisible();
    }

    async verifyDefaultStatus(expectedText: string) {
        await expect(this.statusDropdown).toHaveText(expectedText);
    }
}