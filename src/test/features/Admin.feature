@regression
Feature: Admin Functionality

  Background: Pre-Conditions
    Given I navigate to the login URL "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    When I click on the username field
    And I type "Admin" into the username field
    And the username field should contain "Admin"
    When I click on the password field
    And I type "admin123" into the password field
    And i click on the login button
    Then I should be logged in and see the dashboard page with the title "Dashboard"
    When I click the Admin button on the sidebar

  @admin_title
  Scenario: Validate Admin Page Title
    Then I should see the Admin page with the title Admin

  @deletion
  Scenario: Admin deletes a user successfully
    When the user clicks the Trash Can delete icon on the third record in the Records Found list
    Then the user sees a confirmation modal with the message Are you Sure?
    When the user clicks the Yes, Delete red button
    Then the user no longer sees that record in the Records Found list

  @max-characters
  Scenario: User is informed about the maximum username length
    When the user clicks on the ADD button to add a new user
    And the user enters more than 40 characters into the username field
    Then the user sees a validation message for the username field

  @password-security
  Scenario: password field enforce security
    When the user clicks on the ADD button to add a new user
    And the user enters "password123" into password field
    Then a message is appears stating weak

  @default-status
  Scenario: Status field(Active/Inactive) is NOT selected by default
    When the user clicks on the ADD button to add a new user
    Then the Status field should be set to "-- Select --" by default

  @Self-deletion
  Scenario: Impossible for Admin to Self-Delete their account
    When the user clicks the Trash Can delete icon on the first record in the Records Found list
    Then the page should not display the confirmation modal with the message Are you Sure?

  @cancellation-deletion
  Scenario: The user successfully cancels user deletion
    When the user clicks the "Trash Can" delete icon on the third record in the Records Found list
    Then the user sees a confirmation modal with the message "Are you Sure?"
    When the user clicks the No, Cancel green button
    Then the user still sees that record in the Records Found list
