import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";


let browser: Browser;


//BeforeAll hook: Runs once before all scenarios 
BeforeAll(async function () {
    console.log("\nExecuting test suite...");   
})

//AfterAll hook: Runs once after al;l scenarios have completed
AfterAll(async function () {
    console.log("\nFinished execution of test suite...");
})

// Before hook: Runs before each scenario
Before(async function () { 
   // Replace your current launch line with this:
browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome' // This tells Playwright to use the official Google Chrome
});
   pageFixture.context = await browser.newContext({ viewport: { width: 1280, height: 720 } }); //SIZE of the browser window
   pageFixture.page = await pageFixture.context.newPage();
})

// After hook: Runs after each scenario
After(async function ({pickle, result}) { 
    if(result?.status === Status.FAILED) {
        if(pageFixture.page) {
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',
                //timeout: 60000
            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is undefined');
        }
    }
    await pageFixture.page.close();
    await browser.close();
})

