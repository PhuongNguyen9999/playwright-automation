import { test, expect } from '@playwright/test';
import { BookStorePage } from '../../pages/book-store.page';
import { SEARCH_KEYWORDS, SEARCH_EXPECT_TEXT } from '../../data/books.data';

/**
 * Test Suite: TS01 - Book Store Search
 * Module: Book Store
 */
test.describe('TS01 - Book Store Search', () => {

  /**
   * Test Case: TC01 - Search book by keyword
   * Pre-condition:
   *   User is on Book Store page
   *
   * Steps:
   *   1. Navigate to Book Store page
   *   2. Input keyword into search box
   *   3. Verify search result
   *
   * Expected Result:
   *   All displayed book titles contain the search keyword
   */

  for (const keyword of SEARCH_KEYWORDS) {

    test(`TC01 - Search books with keyword: ${keyword} @smoke @regression`, async ({ page }) => {

      const bookstorePage = new BookStorePage(page);

      // Step 1: Navigate to Book Store
      await bookstorePage.goto();

      // Step 2: Search by keyword
      await bookstorePage.searchBook(keyword);

      // Step 3: Verify result
      const bookTitles = bookstorePage.getBookTitles();
      const count = await bookTitles.count();

      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const title = await bookTitles.nth(i).innerText();
        expect(title.toLowerCase()).toContain(SEARCH_EXPECT_TEXT);
      }
    });

  }
});