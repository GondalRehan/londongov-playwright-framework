const { expect } = require('@playwright/test');

/**
 * Represents the Talk London landing page (https://www.london.gov.uk/talk-london/)
 * Responsible for verifying the title and accessing the search functionality.
 */
export class TalkLondonPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.searchIcon = page.getByRole('textbox', { name: 'Search Talk London' });
  }


  async goto() {
    await this.page.goto('/talk-london/');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Talk London/);
  }

  async clickSearchIcon() {
    await this.searchIcon.click();
  }
}
