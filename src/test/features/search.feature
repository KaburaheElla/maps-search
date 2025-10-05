Feature: Google Maps Search Bar

  As a Google Maps user
  I want to search for a location via the search bar
  So that I can see a map of that location with additional information.

  @searchParis
  Scenario: Search for Paris
    Given I am on the Google Maps page
    When I search for "Paris"
    Then The headline should contain "Paris"

  @searchLondon
  Scenario: Search for London and check directions
    Given I am on the Google Maps page
    When I search for "London"
    Then The headline should contain "London"
    When I click the directions button
    Then The destination field should contain "London"
  
  @searchWithOneCharacter
  Scenario: Search with one character
    Given I am on the Google Maps page
    When I search for "A"
    Then There should be some suggestions for "A"

  @invalidSearch
  Scenario: Invalid search shows no results
    Given I am on the Google Maps page
    When I search for "<location>"
    Then I should see a no results message "<errorMessage>" "<location>"
    Examples:
      | location    | errorMessage              |
      | asdfghjkl   | Google Maps can't find    |
      | !@#$%^&*(  | Google Maps can't find    |
      | 1234567890  | Google Maps can't find    |
