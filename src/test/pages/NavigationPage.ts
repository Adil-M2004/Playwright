import { Page, Locator } from "@playwright/test";
import { config } from '../step-definitions/hooks/config'; // Import the config 
//import { url } from "node:inspector";


//NAVIAGTE TO DIFFERENT PAGES USING THE SIDEBAR (DASHBOARD, ADD, ADMIN)
export class NavigationPage {
    readonly page: Page;
    readonly adminMenuItem: Locator;
    readonly dashboardMenuItem: Locator;
    readonly addUser: Locator;

    constructor(page: Page) {
        this.page = page;
        // Target the sidebar links by their text
        this.adminMenuItem = page.getByRole('link', { name: 'Admin' });
        this.dashboardMenuItem = page.getByRole('link', { name: 'Dashboard' });
        this.addUser = page.getByRole('button', { name: 'Add' });
    }

    //GO TO ADMIN PAGE
    async goToAdmin() {
        await this.adminMenuItem.click();
    }

    //CLICK ADD USER
    async goToAddUser() {
        await this.addUser.click();
    }

   //NAVIAGTE TO URL of WEBSITE
    async goto() {
        await this.page.goto(config.url);
  }

    
}