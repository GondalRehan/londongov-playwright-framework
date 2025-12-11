const { expect } = require('@playwright/test');

/**
 * Represents the search functionality and results page.
 * Responsible for inputting the search term and validating results relevance.
 */
export class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  
    // Locators for elements
    this.searchInput = page.getByRole('textbox', { name: 'Search Talk London' });
    // Selector for search results (targeting common card or link element)
    // this.searchResultsContainer = page.locator('div[data-type="results-item"]');
    this.searchResultsContainer = page.locator('//*[@class="view-content"]/div/div');
    this.filterByStatusButton = page.getByRole('button', { name: 'Filter by status' });
    this.checkboxOpen = page.getByRole('checkbox', { name: 'Open' });
    this.applyFiltersButton = page.getByRole('button', { name: 'Apply filters' });
  }

  // Action: Input the search term and press Enter
  /**
     * @param {string} searchTerm
     */
  async searchFor(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
    // Wait for the results to load
    // await this.page.waitForURL(/search\?keywords=/);
  }

  // Validation: Validate the relevance of search results (core requirement)
  /**
     * @param {string} keyword
     */
  async validateSearchResultsRelevance(keyword) {
    // 1. Ensure at least one result is visible
    await expect(this.searchResultsContainer.first()).toBeVisible();

    // 2. Sample 5 visible results and ensure the keyword is present in the text content (case-insensitive)
    const resultElements = await this.searchResultsContainer.all();
    
    // Check up to the first 5 results (or fewer if less than 5 are found)
    const resultsToCheck = resultElements.slice(0, Math.min(5, resultElements.length));

    let relevantCount = 0;
    const lowerCaseKeyword = keyword.toLowerCase();

    
    for (const element of resultsToCheck) {
        const textContent = (await element.textContent()) || "";
        if (textContent.toLowerCase().includes(lowerCaseKeyword)) {
            relevantCount++;
        }
    }

    // Assert that the majority (at least 60%) of the sampled results are relevant.
    // This is a robust way to handle 'relevance' without being too brittle.
    const relevanceThreshold = 0.6; // 60% relevance threshold
    const requiredRelevant = Math.ceil(resultsToCheck.length * relevanceThreshold);

    if (resultsToCheck.length > 0) {
        expect(relevantCount, 
            `Expected at least ${requiredRelevant} of ${resultsToCheck.length} results to contain '${keyword}', but found only ${relevantCount}.`).toBeGreaterThanOrEqual(requiredRelevant);
    } else {
        // Fallback for edge case, though first validation should catch this
        throw new Error("No search results found to validate relevance.");
    }
  }

  async sortByNewestFirst () {
    await this.page.getByText('Sort by').click();
    await this.page.click('select[name="sort_by"]');
    await this.page.locator('option[value="Newest first"]').click();
    // await this.page.locator('select[name="sort_by"]').click();
    // await this.page.selectOption('select',{value:'Newest first'});

  }
  
  async sortByNewestFirst() {
    await this.page.selectOption('#select', {label:'Newest first'});
  }

  async filterByOpen() {
    await page.getByRole('checkbox', { name: 'Open' }).check();
  }

  async applyFiltersButton() {
    await this.page.selectOption('#edit-field-content-status-121', {label:'Open'});
    
    // await page.getByRole('button', { name: 'Apply filters' }).click();
  }

  // await page.getByRole('button', { name: 'Apply filters' }).click();
  // await expect(page.getByRole('link', { name: '/talk-london/topics/economy/' })).toBeVisible();
// Click the filter by status button
  

  // Select the "Newest first" option from the drop-down or checkbox
  // If it’s a checkbox-style filter:
  

  // If “Newest first” is a radio / select, you can use:
  // await page.getByRole('option', { name: /Newest first/i }).click();

  // Apply filters
  // await page.getByRole('button', { name: /Apply filters/i }).click();

  // Assert that the specific filtered result is visible
  // await expect(page.getByRole('link', { name: '/talk-london/topics/economy/' })).toBeVisible();


}