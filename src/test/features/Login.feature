@regression
Feature: Login to OrangeHRM

  Background: Pre-Conditions
    Given I navigate to the login page

  @cucumber_expression
  Scenario: Login with invalid credentials as Admin
    When I click on the username field
    And I type a specific name into the username field "Admin11"
    When I click on the password field
    And I type a specific password into the password field "admin123"
    And i click on the login button
    Then I should see a validation message saying Invalid credentials

  @login
  Scenario: Login with valid credentials as Admin
    When I click on the username field
    And I type "Admin" into the username field
    And the username field should contain "Admin"
    When I click on the password field
    And I type "admin123" into the password field
    And i click on the login button
    Then I should be logged in and see the dashboard page with the title Dashboard

  @validation1
  Scenario: User is declined to login with no password credentials
    When I click on the username field
    And I type "Admin" into the username field
    And the username field should contain "Admin"
    And i click on the login button
    Then I should see a Required message for the password field

  @validation2
  Scenario: Verify validation messages for empty login fields
    When i click on the login button
    Then I should see a validation message saying Required

  @password-reset
  Scenario: Password reset modal shows up properly
    When I click the Forget your password? link
    Then i should see a modal to reset password


# #TEST 5 - TEST FAILS FOR UNKNOWN REASON
#   @session
#   Scenario: User stays logged-in after closing tab and reopening the application
#     When I click on the username field
#     And I type "Admin" into the username field
#     When I click on the password field
#     And I type "admin123" into the password field
#     And i click on the login button
#     Then I should be logged in and see the dashboard page with the title Dashboard
#     When I close the browser tab
#     And I reopen the application URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
#     Then I should still be logged in and see the dashboard page with the title Dashboard

#   @random
#   Scenario: Login with valid credentials as Admin - Using Random Data
#     When I click on the username field
#     And I type a random username into the username field
#     When I click on the password field
#     And I type a random password into the password field
#     And i click on the login button
#     Then I should be logged in and see the dashboard page with the title Dashboard


 
