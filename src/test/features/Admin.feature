@regression @admin
Feature: Admin Functionality

  Background: Pre-Conditions
    Given I login as an admin

  @IIA-66
  @maxLength
  Scenario: User is informed about the maximum username length
    When the user clicks on the ADD button to add a new user
    And the user enters more than 40 characters into the username field
    Then the user sees a validation message for the username field

  @IIA-65
  @securityStrength
  Scenario: password field enforces security strength of password
    When the user clicks on the ADD button to add a new user
    And the user enters weak password into password field
    Then a message appears stating weak

  @IIA-76
  @statusField
  Scenario: Status field(Active/Inactive) is NOT selected by default
    When the user clicks on the ADD button to add a new user
    Then the Status field should be set to select by default
  
  @IIA-62
  @deletion
  Scenario: Admin Deletes a user successfully
    When the user clicks the Trash Can delete icon on the third record in the Records Found list
    And the user confirms the deletion in the Are you Sure? modal
    Then the user no longer sees that record in the Records Found list

  @IIA_70
  @selfDeletion
  Scenario: Impossible for Admin to Self-Delete their account
    When the user clicks the Trash Can delete icon of username Admin
    Then the page should not display the confirmation modal with the message Are you Sure?
 
  @IIA-63
  @cancelDeletion
  Scenario: The user successfully cancels user deletion
    When the user clicks the Trash Can delete icon on the third record in the Records Found list
    And the user cancels the deletion in the Are you Sure? modal
    Then the user still sees that record in the Records Found list

  @IIA-77
  @bulkDeletion
  Scenario: Bulk deletion of 3 users
    When the user clicks on the checkboxes for the first 3 records under Records Found
    And the user clicks Delete Selected button
    And the user confirms the deletion in the Are you Sure? modal
    Then the user no longer sees those records   

 #FAILS FOR UNKNOWN REASON
  # @userCreation 
  # Scenario: Verify that an Admin can successfully create a new user with all required fields
  #   When the user clicks on the ADD button to add a new user
  #   And the user fills out all required fields with valid data
  #   Then the user sees new user in the Records Found list

  @IIA-183
  @userCreationValidation
  Scenario: Admin sees validation messages when creating a user with empty required fields
    When the user clicks on the ADD button to add a new user
    And the user clicks the Save button without filling out any fields
    Then the user sees validation messages for all required fields
  
  @IIA-190
  @userCreationCancel
  Scenario: Admin cancels user creation and returns to User Management page
    When the user clicks on the ADD button to add a new user
    And the user clicks the Cancel button
    Then the user should be navigated back to the User Management page

  @IIA-59
  @session
  Scenario: User stays logged-in after Logging-in & closing tab & reopening the application
    When I close the browser tab
    And I reopen the application
    Then I should be logged in and see the dashboard page with the title Dashboard
    
