Feature: Login to OrangeHRM

Background: Pre-Conditions
    Given I navigate to the login URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

# @navigation
# Scenario: Successful navigation to the login page
#     Then the login page should be displayed
    
# @login
# Scenario: Login with valid credentials as Admin
#     When I click on the username field 
#     And I type "Admin" into the username field
#     And the username field should contain "Admin"
#     When I click on the password field
#     And I type "admin123" into the password field
#     And i click on the login button
#     Then I should be logged in and see the dashboard page with the title "Dashboard"

# @validation1
# Scenario: User is declined to login with no password credentials
#     Given I navigate to the login URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
#     When I click on the username field 
#     And I type "Admin" into the username field
#     And the username field should contain "Admin"
#     And i click on the login button
#     Then I should see a Required message for the password field

# @validation2
# Scenario: Verify validation messages for empty login fields
#     When i click on the login button
#     Then I should see a validation message saying Required


# #TEST 5 - TEST FAILS FOR SOME REASON
# @session
# Scenario: User stays logged-in after closing tab and reopening the application
#     When I click on the username field 
#     And I type "Admin" into the username field
#     When I click on the password field
#     And I type "admin123" into the password field
#     And i click on the login button
#     Then I should be logged in and see the dashboard page with the title "Dashboard"
#     When I close the browser tab
#     And I reopen the application URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
#     Then I should still be logged in and see the dashboard page with the title "Dashboard"

# @random
# Scenario: Login with valid credentials as Admin - Using Random Data
#     Given I navigate to the login URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
#     When I click on the username field 
#     And I type a random username into the username field
#     #And the username field should contain "Admin"
#     When I click on the password field
#     And I type a random password into the password field
#     And i click on the login button
#     Then I should be logged in and see the dashboard page with the title "Dashboard"
#     When I click the Admin button on the sidebar


# #DRY - Don't Repeat Yourself
# @validation_scenarios
# Scenario Outline: Validate Login with multiple credentials 
#     Given I navigate to the login URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
#     When I click on the username field 
#     And I type "<username>" into the username field
#     When I click on the password field
#     And I type "<password>" into the password field
#     And i click on the login button
#     Then I should see a validation message saying <message>
    
#     Examples:
#         | username  | password   | message                             |
#         | Admin     | admin123   | Dashboard                           |
#         | Admin     | wrongpass  | Invalid credentials                 |
#         | wronguser | admin123   | Invalid credentials                 |
#         |           | admin123   | Required                            |
#         | Admin     |            | Required                            |

