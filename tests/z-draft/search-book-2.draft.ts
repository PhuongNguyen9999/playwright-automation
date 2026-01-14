import { test, expect } from '@playwright/test';

test('Search book with multiple results', async ({ page }) => {
  await page.goto('https://demoqa.com/books');

  // Step 1: Input search text
  await page.getByPlaceholder('Type to search').fill('Design');

  // Step 2: Get all visible book titles
  const bookTitles = page.getByRole('link');

  const count = await bookTitles.count();
  expect(count).toBeGreaterThan(0);

  // Step 3: Verify each title contains "design"
  for (let i = 0; i < count; i++) {
    const titleText = await bookTitles.nth(i).textContent();
    expect(titleText?.toLowerCase()).toContain('design');
  }
});