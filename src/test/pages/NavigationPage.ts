import { Page, Locator } from "@playwright/test";


//NAVIAGTE TO DIFFERENT PAGES USING THE SIDEBAR (DASHBOARD, ADD, ADMIN)
export class NavigationPage {
    readonly page: Page;
    readonly adminMenuItem: Locator;
    readonly pimMenuItem: Locator;
    readonly dashboardMenuItem: Locator;
    readonly addUser: Locator;

    constructor(page: Page) {
        this.page = page;
        // Target the sidebar links by their text
        this.adminMenuItem = page.getByRole('link', { name: 'Admin' });
        this.pimMenuItem = page.getByRole('link', { name: 'PIM' });
        this.dashboardMenuItem = page.getByRole('link', { name: 'Dashboard' });
        this.addUser = page.getByRole('button', { name: 'Add' });
    }

    async goToAdmin() {
        await this.adminMenuItem.click();
    }

    async goToPIM() {
        await this.pimMenuItem.click();
    }
}