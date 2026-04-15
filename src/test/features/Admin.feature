@regression @admin
Feature: Admin Functionality

  Background: Pre-Conditions
    Given I login as an admin

  # @smoke
  # Scenario: Validate Admin Page Title
  #   Then I should see the Admin page with the title Admin


  Scenario: Admin deletes a user successfully
    When the user clicks the Trash Can delete icon on the third record in the Records Found list
    Then the user sees a confirmation modal with the message Are you Sure?
    When the user clicks the Yes, Delete red button
    Then the user no longer sees that record in the Records Found list

  Scenario: Impossible for Admin to Self-Delete their account
    When the user clicks the Trash Can delete icon of username Admin
    Then the page should not display the confirmation modal with the message Are you Sure?


  Scenario: The user successfully cancels user deletion
    When the user clicks the Trash Can delete icon on the third record in the Records Found list
    Then the user sees a confirmation modal with the message Are you Sure?
    When the user clicks the No, Cancel green button
    Then the user still sees that record in the Records Found list

  @smoke
  Scenario: Bulk deletion of 3 users
    When the user clicks on the checkboxes for the first 5 records under Records Found
    And the user clicks Delete Selected button
    Then the user sees a confirmation modal with the message Are you Sure?
    And the user clicks the Yes, Delete red button

  
  Scenario: User is informed about the maximum username length
    When the user clicks on the ADD button to add a new user
    And the user enters more than 40 characters into the username field
    Then the user sees a validation message for the username field

 
  Scenario: password field enforce security
    When the user clicks on the ADD button to add a new user
    And the user enters "password123" into password field
    Then a message is appears stating weak

 
  Scenario: Status field(Active/Inactive) is NOT selected by default
    When the user clicks on the ADD button to add a new user
    Then the Status field should be set to "-- Select --" by default

  # @user-creation
  # Scenario: Admin creates a new user with all required fields filled
  #   When the user clicks on the ADD button to add a new user
  #   Then the user sees the form for adding a user
  #   When the user checks all the required checkboxes on the form
  #   And the user types "John Doe" into the Employee name field
  #   And the user types "new_user1" into the Username field
  #   And the user types "user123passTest" into the password field
  #   And the user clicks the Save button
  #   Then the user should see the new user "new_user1" under the Records Found list
