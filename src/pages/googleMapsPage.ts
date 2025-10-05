import { Page, expect } from '@playwright/test';

export class GoogleMapsPage {
  constructor(private page: Page) {}

  private get rejectCookiesButton() {
    return this.page.locator('button[aria-label="Reject all"]').first();
  }

  private get searchBox() {
    return this.page.locator('#searchboxinput');
  }

  private get searchButton() {
    return this.page.locator('#searchbox-searchbutton');
  }

  private get firstHeading() {
    return this.page.getByRole('heading').first();
  }

  private get directionsButton() {
    return this.page.getByRole('button', { name: 'Directions' });
  }

  private get destinationField() {
    return this.page.locator('.tactile-searchbox-input').nth(1);
  }

  private noResultsMessage(errorMessage: string, location: string) {
    return this.page.locator(
      `xpath=//div[contains(., "${errorMessage}")]/i[contains(., "${location}")]`
    );
  }

  async goto() {
    await this.page.goto('https://www.google.com/maps?hl=en');
    // Handle cookies if visible
    if (await this.rejectCookiesButton.isVisible()) {
      await this.rejectCookiesButton.click();
    }
  }

  async searchFor(location: string) {
    await this.searchBox.waitFor({ state: 'visible' });
    await this.searchBox.fill(location);
    await this.searchButton.click();
  }

  async verifySuggestionsContain(location: string) {

    // Google Maps suggestion are usually clickable links
    // We can locate any visible <a> that has a div inside
    const suggestions = this.page.locator('a:visible >> div:visible');

    // Wait up to 10 seconds for suggestions to appear
    await expect.poll(async () => await suggestions.count(), {
        timeout: 10000,
        message: `Waiting for suggestions for "${location}"`,
    }).toBeGreaterThan(0);
    // At this point, we know there is at least one suggestion
    const count = await suggestions.count();
    if (count > 0) {
        // check that at least one suggestion contains the searched location
        const texts = await suggestions.allTextContents();
        const hasMatch = texts.some((t) => t.toLowerCase().includes(location.toLowerCase()));
        expect(hasMatch, `No suggestion contains "${location}"`).toBeTruthy();
    } else {
        throw new Error(`No suggestions found for "${location}"`);
    }
  }

  async verifyHeadlineContains(location: string) {
    await this.firstHeading.waitFor({ state: 'visible' });
    await expect(this.firstHeading).toContainText(location);
  }

  async clickDirections() {
    await this.directionsButton.waitFor({ state: 'visible' });
    await this.directionsButton.click();
  }

  async verifyDestinationContains(location: string) {
    await expect(this.destinationField).toHaveValue(
      new RegExp(location, 'i'),
      { timeout: 15000 }
    );
  }

  async verifyNoResultsMessage(errorMessage: string, location: string) {
    const locationElement = this.noResultsMessage(errorMessage, location);
    await locationElement.waitFor({ state: 'visible', timeout: 15000 });
    await expect(locationElement).toHaveText(location);
  }
}
