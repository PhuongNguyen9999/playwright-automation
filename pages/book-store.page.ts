import { Page, expect } from '@playwright/test';
// Import Page và expect

export class BookStorePage {
  // Class đại diện cho trang Book Store

  constructor(private page: Page) {}
  // Lưu page để sử dụng trong class

  async goto() {
    // Mở trang book store
    await this.page.goto('https://demoqa.com/books', {
      waitUntil: 'domcontentloaded'
      // Đợi load xong HTML
    });
  }

  async searchBook(keyword: string) {
    // Hàm tìm kiếm sách theo keyword
    await this.page.fill('#searchBox', keyword);
    // Nhập keyword vào ô search
  }

  getBookTitles() {
    // Hàm lấy danh sách title sách
    return this.page.locator('.rt-tbody .rt-tr-group a');
    // Trả về locator chứa nhiều phần tử <a>
  }
}