import { test, expect, request } from '@playwright/test';
// Import test, expect và request để call API

import { USER } from '../../data/users.data';
// Import user data

import { BOOK } from '../../data/books.data';
// Import book data

import { LoginPage } from '../../pages/login.page';
// Import Login Page Object

import { ProfilePage } from '../../pages/profile.page';
// Import Profile Page Object

test.describe('Delete book successfully', () => {
  // Nhóm test

  test.beforeEach(async () => {
    // Chạy trước mỗi test

    const apiContext = await request.newContext({
      // Tạo API client

      baseURL: 'https://demoqa.com',

      extraHTTPHeaders: {
        Authorization:
          'Basic ' + Buffer.from(`${USER.username}:${USER.password}`).toString('base64'),
        // Encode username:password thành Basic Auth

        'Content-Type': 'application/json'
      }
    });

    const response = await apiContext.post('/BookStore/v1/Books', {
      // Gọi API add book

      data: {
        userId: USER.userId,
        // User ID

        collectionOfIsbns: [{ isbn: BOOK.isbn }]
        // Danh sách sách cần add
      }
    });

    console.log('Add book API status:', response.status());
  });

  test('Delete book from profile', async ({ page }) => {
    // Test xóa sách

    const loginPage = new LoginPage(page);
    // Tạo LoginPage

    const profilePage = new ProfilePage(page);
    // Tạo ProfilePage

    console.log('Login to application');

    await loginPage.goto();
    // Mở trang login

    await loginPage.login(USER.username, USER.password);
    // Login

    await loginPage.verifyLoginSuccess(USER.username);
    // Verify login thành công

    console.log('Go to profile page');
    await profilePage.goto();
    // Mở trang profile

    console.log('Search book');
    await profilePage.searchBook(BOOK.name);
    // Search sách

    const bookTitle = profilePage.getBookTitle(BOOK.name);
    // Lấy element sách

    await expect(bookTitle).toBeVisible();
    // Kiểm tra sách tồn tại

    console.log('Delete book');
    await profilePage.deleteBook();
    // Xóa sách

    await expect(bookTitle).toHaveCount(0);
    // Kiểm tra sách đã bị xóa

    console.log('Book deleted successfully');
  });
});