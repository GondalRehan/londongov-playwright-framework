import { test, expect } from '@playwright/test';
import { acceptCookiesIfVisible } from '../utils/cookies';
const { TalkLondonPage } = require('../pages/talkLondonPage');
const { SearchResultsPage } = require('../pages/searchResultsPage');


test.describe('LGOV Search Functionality Test', () => {

    const searchTerm = 'Budget';

    test('should successfully search for "Budget" and validate results relevance', async ({ page }) => {

        const talkLondonPage = new TalkLondonPage(page);
        const searchResultsPage = new SearchResultsPage(page);

        await test.step(`Maps to the Talk London landing page`, async () => {
            await talkLondonPage.goto('');
            acceptCookiesIfVisible(page);
        });

        // 2. Verify page title contains "Talk London"
        await test.step('Verify page title', async () => {
            await talkLondonPage.verifyTitle();
        });

        // 3. Click the search icon on the top-right corner.
        await test.step('Open the search bar', async () => {
            await talkLondonPage.clickSearchIcon();
        });

        //4. Search for "Budget"
        await test.step(`Search for the term: "${searchTerm}"`, async () => {
            await searchResultsPage.searchFor(searchTerm);
        });

        // 5. Validate that the search results are relevant to the keyword.
        await test.step('Validate search result relevance', async () => {
            await searchResultsPage.validateSearchResultsRelevance(searchTerm);
        });
        
        console.log(`Test passed: Successfully searched for "${searchTerm}" and validated result relevance.`);
       
        await test.step('Sort results by Newest First', async () => {   
            await searchResultsPage.sortByNewestFirst ()
        });
        
        // await test.step('Filter results by Open status', async () => {   
        //     await searchResultsPage.filterByOpen ()
        // });

    });
});