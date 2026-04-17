@regression @admin
Feature: Admin Functionality

  Background: Pre-Conditions
    Given I login as an admin

  Scenario: Admin selects the delete button for deletion
    When the user clicks the Trash Can delete icon on the third record in the Records Found list
    Then the user sees a confirmation modal with the message Are you Sure?

  Scenario: User confirms deletion // IMPLEMENT!!!
    When the user clicks the Yes, Delete red button
    Then the user no longer sees that record in the Records Found list

  Scenario: Impossible for Admin to Self-Delete their account
    When the user clicks the Trash Can delete icon of username Admin
    Then the page should not display the confirmation modal with the message Are you Sure?

  Scenario: The user successfully cancels user deletion
    When the user clicks the No, Cancel green button
    Then the user still sees that record in the Records Found list

# TEST INCLUDED CHECK FOR AMOUNT OF RECORDS FROM EXECUTION  (TEST MAY FAIL) 
  Scenario: Bulk deletion of 3 users
    When the user clicks on the checkboxes for the first 3 records under Records Found
    And the user clicks Delete Selected button
    Then the user sees a confirmation modal with the message Are you Sure?
    And the user clicks the Yes, Delete red button
    And the user no longer sees those records   //IMPLEMENT!!!

  @smoke
  Scenario: User is informed about the maximum username length
    When the user clicks on the ADD button to add a new user
    And the user enters more than 40 characters into the username field
    Then the user sees a validation message for the username field

  Scenario: password field enforces security strength of password
    When the user clicks on the ADD button to add a new user
    And the user enters "password123" into password field
    Then a message appears stating weak

  Scenario: Status field(Active/Inactive) is NOT selected by default
    When the user clicks on the ADD button to add a new user
    Then the Status field should be set to "-- Select --" by default
