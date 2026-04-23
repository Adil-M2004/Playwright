import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginHeader: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly resetPasswordHeader: Locator;
    readonly invalidCredentialsMessage: Locator;
    readonly requiredMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHeader = page.getByRole('heading', { name: 'Login' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByText('Forgot your password?');
        this.resetPasswordHeader = page.getByRole('heading', { name: 'Reset Password' });
        this.invalidCredentialsMessage = page.locator('p:has-text("Invalid credentials")');
        this.requiredMessage = page.locator('span:has-text("Required")');
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async invalidCredentials() {
        await expect(this.invalidCredentialsMessage).toBeVisible();
    }
}