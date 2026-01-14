import { test, expect } from '@playwright/test';
import { BookStorePage } from '../../pages/BookStorePage';

test.describe('Search book with multiple results', () => {
  const searchKeywords = ['Design', 'design'];

  for (const keyword of searchKeywords) {
    test(`Search books with keyword: ${keyword}`, async ({ page }) => {
      console.log(`\n Start test with keyword: "${keyword}"`);

      const bookStorePage = new BookStorePage(page);
      await bookStorePage.navigate();
      console.log('Navigated to Book Store page');

      await bookStorePage.fillSearchBox(keyword);
      console.log(`Filled search box with: "${keyword}"`);

      const count = await bookStorePage.getBookCount();
      console.log(`Number of books found: ${count}`);

      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const titleText = await bookStorePage.getBookTitleAtIndex(i);
        console.log(`Book ${i + 1}: ${titleText}`);
        expect(titleText.toLowerCase()).toContain('design');
      }
      console.log(`Test PASSED for keyword: "${keyword}"`);
    });
  }
});