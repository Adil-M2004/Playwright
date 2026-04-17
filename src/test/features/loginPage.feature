@regression @loginPage
Feature: Login Page Appears
  
  @loginPageAssertion
  Scenario: Login page works preoperly
    When I navigate to the login page
    Then the login page should be displayed
