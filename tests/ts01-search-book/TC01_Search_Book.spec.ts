import { test, expect } from '@playwright/test';
// Import framework test

import { BookStorePage } from '../../pages/book-store.page';
// Import Page Object

import { SEARCH_KEYWORDS, SEARCH_EXPECT_TEXT } from '../../data/books.data';
// Import data test

test.describe('Search book with multiple results', () => {
  // Nhóm test

  for (const keyword of SEARCH_KEYWORDS) {
    // Lặp qua từng keyword

    test(`Search books with keyword: ${keyword}`, async ({ page }) => {
      // Mỗi keyword là 1 test riêng

      const bookstorePage = new BookStorePage(page);
      // Tạo object BookStorePage

      console.log(`\nStart test with keyword: ${keyword}`);

      await bookstorePage.goto();
      // Mở trang book store

      await bookstorePage.searchBook(keyword);
      // Tìm kiếm sách

      const bookTitles = bookstorePage.getBookTitles();
      // Lấy danh sách title

      const count = await bookTitles.count();
      // Đếm số sách

      console.log(`Found ${count} books`);

      expect(count).toBeGreaterThan(0);
      // Phải có ít nhất 1 kết quả

      let isTestPassed = true;
      // Biến đánh dấu test pass/fail

      for (let i = 0; i < count; i++) {
        // Lặp từng cuốn sách

        const title = await bookTitles.nth(i).innerText();
        // Lấy text title

        console.log(`Book ${i + 1}: ${title}`);

        if (!title.toLowerCase().includes(SEARCH_EXPECT_TEXT)) {
          // Nếu title không chứa keyword mong đợi
          isTestPassed = false;
        }
      }

      if (isTestPassed) {
        console.log(`Test PASSED for keyword: ${keyword}`);
      } else {
        console.log(`Test FAILED for keyword: ${keyword}`);
        throw new Error('Search result contains invalid books');
        // Fail test
      }
    });
  }
});