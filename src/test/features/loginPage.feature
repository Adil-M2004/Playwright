@regression @loginPage
Feature: Login Page Appears
  
  @loginPageAssertion
  Scenario: Test the Login Page is Displayed
    When I navigate to the login page
    Then the login page should be displayed
