@regression @login
Feature: Login to OrangeHRM

  # Pre-Condition
  Background: Pre-Conditions
    Given I navigate to the login page

  @fieldElements
  Scenario: Username is seen in field after input
    When I click on the username field
    And I type into the username field
    Then the username field should contain the username
  #Positive Path

  @validLogin
  Scenario: Login with valid credentials as Admin
    When I click on the username field
    And I type into the username field
    And I click on the password field
    And I type into the password field
    And i click on the login button
    Then I should be logged in and see the dashboard page with the title Dashboard

  @nonExistentUser
  Scenario: User attempts to login with Invalid Credentials
    When the user types non-existent username into the username field
    And the user types non-existent password into the password field
    And i click on the login button
    Then I should see a validation message saying Invalid credentials
    
  #Negetive Path - cucumber experession
  @invalidLogin
  Scenario: Login with invalid Username as Admin
    When I click on the username field
    And I type a specific name into the username field "Admin11"
    And I click on the password field
    And I type a specific password into the password field "admin123"
    And i click on the login button
    Then I should see a validation message saying Invalid credentials
#Negetive Path

  @emptyPassword
  Scenario: Verify validation messages with no password credentials
    When I click on the username field
    And I type into the username field
    And i click on the login button
    Then I should see a validation message saying Required
#Negetive Path

  @emptyUsername
  Scenario: Verify validation messages with no username credentials
    When I click on the password field
    And I type into the password field
    And i click on the login button
    Then I should see a validation message saying Required
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
  
  @passwordMasking
  Scenario: Password field should mask the input
    When I click on the password field
    And I type into the password field
    Then the password field should mask the input with dots or asterisks

 