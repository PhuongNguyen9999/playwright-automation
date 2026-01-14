import { test, expect, request } from '@playwright/test';
import { BookStorePage } from '../../pages/BookStorePage';
import { TEST_DATA } from '../testData';
import { SITE_URLS } from '../../pages/siteUrls';

const { USERNAME, PASSWORD, USER_ID, ISBN, BOOK_NAME } = TEST_DATA;

test.describe('Delete book successfully', () => {
  test.beforeEach(async () => {
    const apiContext = await request.newContext({
      baseURL: SITE_URLS.BASE_URL,
      extraHTTPHeaders: {
        Authorization:
          'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    const response = await apiContext.post('/BookStore/v1/Books', {
      data: {
        userId: USER_ID,
        collectionOfIsbns: [
          { isbn: ISBN }
        ]
      }
    });

    console.log('Add book API status:', response.status());
  });

  test('Delete book from profile', async ({ page }) => {
    console.log('Login to application');

    await page.goto(SITE_URLS.LOGIN, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await page.fill('#userName', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login');

    await expect(page.locator('#userName-value')).toHaveText(USERNAME);

    console.log('Navigate to Profile page');
    await page.goto(SITE_URLS.PROFILE);

    console.log('Search book using POM');
    const bookStorePage = new BookStorePage(page);
    await bookStorePage.fillSearchBox(BOOK_NAME);

    const bookTitle = page.getByRole('link', { name: BOOK_NAME });
    await expect(bookTitle).toBeVisible();

    console.log('Click Delete button');
    await page.locator('#delete-record-undefined').click();

    console.log('Confirm delete');
    await page.getByRole('button', { name: 'OK' }).click();

    console.log('Accept alert');
    page.once('dialog', dialog => dialog.accept());

    await expect(bookTitle).toHaveCount(0);

    console.log('Book deleted successfully');
  });
});