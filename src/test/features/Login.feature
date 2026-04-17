@regression @login
Feature: Login to OrangeHRM
  # Pre-Condition

  Background: Pre-Conditions
    Given I navigate to the login page

  @fieldElements
  Scenario: Username is seen in field after input
    When I click on the username field
    And I type into the username field
  #Positive Path

  @validLogin
  Scenario: Login with valid credentials as Admin
    When I click on the username field
    And I type into the username field
    When I click on the password field
    And I type "admin123" into the password field
    And i click on the login button
    Then I should be logged in and see the dashboard page with the title Dashboard

  @NonExistentUser
  Scenario: User attempts to login with Invalid Crednetials
    When the user types non-existent username into the usernanme field
    And the user types non-existent password into the password field
    And i click on the login button
    Then I should see a validation message saying Invalid credentials
  #Negetive Path - cucumber experession

  @invalidLogin
  Scenario: Login with invalid credentials as Admin
    When I click on the username field
    And I type a specific name into the username field "Admin11"
    When I click on the password field
    And I type a specific password into the password field "admin123"
    And i click on the login button
    Then I should see a validation message saying Invalid credentials
#Negetive Path

  @emptyPassword
  Scenario: Verify validation messages with no password credentials
    When I click on the username field
    And I type into the username field
    And i click on the login button
    Then I should see a Required message for the password field
#Negetive Path

  @emptyUsername
  Scenario: Verify validation messages with no password credentials
    When I click on the password field
    And I type into the password field
    And i click on the login button
    Then I should see a Required message for the username field
#Negetive Path

  @emptyFields
  Scenario: Verify validation messages for empty login fields
    When i click on the login button
    Then I should see a validation message saying Required
#Poasitive Path

  @passwordReset
  Scenario: Password reset modal shows up properly
    When I click the Forget your password? link
    Then i should see a modal to reset password

  @session
  Scenario: Login with valid credentials as Admin
    When I click on the username field
    And I type into the username field
    When I click on the password field
    And I type "admin123" into the password field
    And i click on the login button
    Then I should be logged in and see the dashboard page with the title Dashboard

  @session
  Scenario: User DOES NOT stay logged-in after closing tab and reopening the application
    #When I close the browser tab
    And I reopen the application
    Then the login page should be displayed
  #Then I should still be logged in and see the dashboard page with the title Dashboard
