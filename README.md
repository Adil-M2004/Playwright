PLAYWIGHT-CUCUMBER PROJECT BY ADIL MANZOOR - DOCUMENTATION
_______________________________________________________________
# About Project
This playwright project included Gherkin Test cases which tests a web application called ORANGE HRM.

**Naming Convantion** - camelCase
_________________________________________________________________
Prerequisites - 

- Node.js: Version 20 or higher.

- Package Manager: npm, nod

- Download Extension: "Cucumber (Gherkin) Full Support" 

**UPDATE: New and more efficient way to execute singular scenarios or Files using TAGS**
If you want to exectue Only ONE SCENARIO or Only ONE feature file, The Command for that is:

- npm run cucumber <tag_name>
______________________________________________

- Currently there are 3 Feature files that can be run, they are the following
- npm run cucumber admin = **TARGETS ADMIN TESTS ONLY**
- npm run cucumber login = **TARGETS LOGIN TESTS ONLY**
- npm run cucumber loginPage = **TARGETS LOGINPAGE TEST ONLY**

**FOR OTHER SCENARIO'S, REPLACE <tag_name> with a tag that is included in src/index.ts & in any of the feature files**
**NEW TAG MUST BE DECLARED IN INDEX.TS BEFORE USE**


_______________________________________________________________
**IMPORTANT NOTICE**
Sometimes Test(s) can fail due to:
- The website (OrangeHRM) changing lanuages (Chinese, german etc....)
- Insufficient amount of records available for test to run(FOR THE DELETION TEST CASES)

**REPORTS**
__________________________
To run reports on test(s) insert following at the end of "cucumberWithTS" in "package.json"
- -f json:./reports/report.json
- NOTE: This has already been implemented

- Thge reports also include Screenshots of Failures, if they occur

**Page Object Models(POM)**
________________________________________________

- Each page of the website being tested has its own POM, which declares and stores all the page Objects(elements) and actions taken by/to the objects.