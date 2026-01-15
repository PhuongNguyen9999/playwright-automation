import { test, expect, request } from '@playwright/test';
import { USER } from '../../data/users.data';
import { BOOK } from '../../data/books.data';
import { LoginPage } from '../../pages/login.page';
import { ProfilePage } from '../../pages/profile.page';

/**
 * Test Suite: TS02 - Profile Book Management
 * Module: User Profile
 */
test.describe('TS02 - Profile Book Management', () => {

  /**
   * Pre-condition:
   *   User must have a book in profile
   */
  test.beforeEach(async () => {

    const apiContext = await request.newContext({
      baseURL: 'https://demoqa.com',
      extraHTTPHeaders: {
        Authorization:
          'Basic ' + Buffer.from(`${USER.username}:${USER.password}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    await apiContext.post('/BookStore/v1/Books', {
      data: {
        userId: USER.userId,
        collectionOfIsbns: [{ isbn: BOOK.isbn }]
      }
    });
  });

  /**
   * Test Case: TC02 - Delete book from profile
   *
   * Steps:
   *   1. Login to application
   *   2. Navigate to profile page
   *   3. Search book
   *   4. Delete book
   *
   * Expected Result:
   *   Book is removed from profile
   */

  test('TC02 - Delete book from profile successfully @smoke @regression', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(USER.username, USER.password);
    await loginPage.verifyLoginSuccess(USER.username);

    // Step 2: Go to profile
    await profilePage.goto();

    // Step 3: Search book
    await profilePage.searchBook(BOOK.name);
    const bookTitle = profilePage.getBookTitle(BOOK.name);
    await expect(bookTitle).toBeVisible();

    // Step 4: Delete book
    await profilePage.deleteBook();

    // Verify
    await expect(bookTitle).toHaveCount(0);
  });
});