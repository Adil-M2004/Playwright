PLAYWIGHT-CUCUMBER PROJECT BY ADIL MANZOOR - DOCUMENTATION
_______________________________________________________________
# About Project
This playwright project included Gherkin Test cases which tests a web application called ORANGE HRM.
_________________________________________________________________
Prerequisites - 

- Node.js: Version 18 or higher.

- Package Manager: npm, node.

- Execution Command(CUSTOM SCRIPT): npm run cucumberWithTS

If you want to exectue Only ONE SCENARIO:
go to "package.json" and add "--tags @name_of_tag" at end of cucumberWithTS value

EXAMPLE: "cucumberWithTS": "cucumber-js src/test/features/*.feature --require-module ts-node/register --require src/step-definitions/**/**/*.ts --require src/test/utils/cucumber-timeout.ts --tags @name_of_tag"

_______________________________________________________________
IMPORTANT NOTICE:
Sometimes Test(s) can fail due to:
- The website (OrangeHRM) changing lanuages (Chinese, german etc....)
- Not enough records for deletion

REPORTS
__________________________
To run reports on test(s) insert following at the end of "cucumberWithTS" in "package.json"
- -f json:./reports/report.json