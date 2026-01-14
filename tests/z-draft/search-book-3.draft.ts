import { test, expect } from '@playwright/test';

test.describe('Search book with multiple results', () => {

  const searchKeywords = ['Design', 'design'];

  for (const keyword of searchKeywords) {

    test(`Search books with keyword: ${keyword}`, async ({ page }) => {

      // 1. Navigate to Book Store page
      await page.goto('https://demoqa.com/books');

      // 2. Locate the search input
      const searchBox = page.locator('#searchBox');

      // 3. Fill search keyword
      await searchBox.fill(keyword);

      // 4. Get all visible book titles after searching
      const bookTitles = page.locator('.rt-tbody .rt-tr-group a');

      // 5. Get number of matched books
      const count = await bookTitles.count();

      // 6. Verify at least one result is displayed
      expect(count).toBeGreaterThan(0);

      // 7. Verify each book title contains "design" (case-insensitive)
      for (let i = 0; i < count; i++) {
        const titleText = await bookTitles.nth(i).innerText();
        expect(titleText.toLowerCase()).toContain('design');
      }
    });
  }
});