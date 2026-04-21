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
    readonly cancelButton: Locator;
    readonly employeeName: Locator;
    readonly userRoleDropdown: Locator;
    readonly autocompleteDropdown: Locator;
    readonly firstOption: Locator;
    readonly requiredMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.requiredMessage = page.locator('span:has-text("Required")').first();
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

        // The Dropdown container that appears
        this.autocompleteDropdown = page.locator('.oxd-autocomplete-dropdown');

        // The first option inside that dropdown
        this.firstOption = this.autocompleteDropdown.locator('.oxd-autocomplete-option').first();
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    
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

    async clickCancel() {
        await this.cancelButton.click();
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
        // 1. Click the input first to ensure it has focus
    await this.employeeName.click();

    // 2. Type slowly (mimic a human)
    // This ensures the search trigger in the app actually fires
    await this.employeeName.pressSequentially(employeeName, { delay: 100 });

    // 3. Wait for the dropdown container to appear in the DOM
    // We add a small timeout to ensure the API call has time to return results
    await this.autocompleteDropdown.waitFor({ state: 'visible', timeout: 5000 });

    // 4. Click the first option
    // Sometimes .click() happens too fast; .hover() first can help stability
    await this.firstOption.hover();
    await this.firstOption.click();
        

    }
    //ASSERTIO NTO SEE NEW USER IN RECORDS FOUND
    async verifyNewUserInRecordsFound(username: string) {
        const newUserRow = this.page.locator('.oxd-table-card', { hasText: username });
        await expect(newUserRow).toBeVisible();
    }

    async verifyRequiredFieldMessages() {
        await expect(this.requiredMessage).toBeVisible();
    }


}//LB