import { Page, Locator, expect } from '@playwright/test';

export class AddUserPage {
    readonly page: Page;
    readonly addUserHeader: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly usernameLengthError: Locator;
    readonly weakPasswordMessage: Locator;
    readonly statusDropdown: Locator;
    readonly saveButton: Locator;
    readonly employeeName: Locator;
    readonly userRoleDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addUserHeader = page.getByRole('heading', { name: 'Add User' });
        // Keeping nth(x) logic, but encapsulated here for easier future updates
        this.usernameInput = page.locator('.oxd-input-group', { hasText: 'Username' })
                                 .locator('input');
        this.passwordInput = this.passwordInput = page.locator('.oxd-input-group', { hasText: /^Password$/ })
                                 .locator('input');
        this.confirmPasswordInput = page.locator('.oxd-input-group', { hasText: /^Confirm Password$/ })
                                 .locator('input');

        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.usernameLengthError = page.getByText('Should not exceed 40');
        this.weakPasswordMessage = page.getByText('Weak');
        this.statusDropdown =  page.locator('div.oxd-input-group', { hasText: 'Status' })
                                    .locator('.oxd-select-text');

        this.userRoleDropdown = page.locator('div.oxd-input-group', { hasText: 'User Role' })
                                    .locator('.oxd-select-text');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    
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

    async enterConfirmPassword(password: string) {
        await this.confirmPasswordInput.fill(password);
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
    async clickSave() {
        await this.saveButton.click();
    }

    async selectStatus() {
        await this.statusDropdown.click();
        const option = this.page.getByRole('option', { name: 'Enabled' });
        await option.click();
    }

    async adminUserRole() {
        await this.userRoleDropdown.click();
        const option = this.page.getByRole('option', { name: 'Admin' });
        await option.click();
    }
    
    async enterEmployeeName(employeeName: string) {
        await this.employeeName.fill(employeeName);

    }
    //ASSERTIO NTO SEE NEW USER IN RECORDS FOUND
    async verifyNewUserInRecordsFound(username: string) {
        const newUserRow = this.page.locator('.oxd-table-card', { hasText: username });
        await expect(newUserRow).toBeVisible();
    }


}//LB