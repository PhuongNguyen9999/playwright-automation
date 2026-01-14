import { test, expect } from '@playwright/test';

test.describe('Delete book successfully', () => {

  test('User can delete a book from profile', async ({ page }) => {

    const bookName = 'Learning JavaScript Design Patterns';

    // 1. Go to Login page
    await page.goto('https://demoqa.com/login');

    // 2. Login
    await page.locator('#userName').fill('phuong.playwright001');
    await page.locator('#password').fill('PhuongNguyen@12345');
    await page.locator('#login').click();

    // 3. Verify login success → redirect to Profile page
    await expect(page).toHaveURL(/profile/);

    // 4. Search book by name
    const searchBox = page.locator('#searchBox');
    await searchBox.fill(bookName);

    // 5. Locate book title
    const bookTitle = page.locator('.rt-tbody .rt-tr-group a', {
      hasText: bookName,
    });

    // 6. Verify book is displayed
    await expect(bookTitle).toBeVisible();

    // 7. Click Delete button (trash icon)
    await page.locator('#delete-record-undefined').click();

    // 8. Click OK on confirmation modal
    await page.locator('#closeSmallModal-ok').click();

    // 9. Handle browser alert "Book deleted."
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // 10. Verify book is no longer shown
    await expect(bookTitle).toHaveCount(0);
  });

});