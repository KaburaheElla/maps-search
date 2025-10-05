import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../../hooks/pageFixture';
import { GoogleMapsPage } from '../../pages/googleMapsPage';

setDefaultTimeout(60 * 1000 * 2);

let mapsPage: GoogleMapsPage;

/**
 * Setup Google Maps page
 */
Given('I am on the Google Maps page', async function (this: CustomWorld) {
  mapsPage = new GoogleMapsPage(this.page);
  await mapsPage.goto();
});

/**
 * Search for a location
 */
When('I search for {string}', async function (this: CustomWorld, location: string) {
  await mapsPage.searchFor(location);
});

/**
 * Verify suggestions headline
 */
Then('There should be some suggestions for {string}', async function (this: CustomWorld, location: string) {
  await mapsPage.verifySuggestionsContain(location);
});

/**
 * Verify headline after search
 */
Then('The headline should contain {string}', async function (this: CustomWorld, location: string) {
  await mapsPage.verifyHeadlineContains(location);
});

/**
 * Click the Directions button
 */
When('I click the directions button', async function (this: CustomWorld) {
  await mapsPage.clickDirections();
});

/**
 * Verify destination field value
 */
Then('The destination field should contain {string}', async function (this: CustomWorld, location: string) {
  await mapsPage.verifyDestinationContains(location);
});

/**
 * Verify no results message
 */
Then(
  'I should see a no results message {string} {string}',
  async function (this: CustomWorld, errorMessage: string, location: string) {
    await mapsPage.verifyNoResultsMessage(errorMessage, location);
  }
);
