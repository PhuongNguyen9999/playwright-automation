import { Page, expect } from '@playwright/test';
// Import Page và expect

export class ProfilePage {
  // Class đại diện cho trang Profile

  constructor(private page: Page) {}
  // Nhận page từ Playwright

  async goto() {
    // Mở trang profile
    await this.page.goto('https://demoqa.com/profile');
  }

  async searchBook(bookName: string) {
    // Tìm sách trong profile
    await this.page.fill('#searchBox', bookName);
    // Nhập tên sách vào ô search
  }

  getBookTitle(bookName: string) {
    // Lấy link sách theo tên
    return this.page.getByRole('link', { name: bookName });
    // Tìm thẻ <a> có text đúng tên sách
  }

  async deleteBook() {
    // Click nút delete
    await this.page.locator('#delete-record-undefined').click();

    // Click nút OK trong popup
    await this.page.getByRole('button', { name: 'OK' }).click();

    // Tự động accept alert trình duyệt
    this.page.once('dialog', dialog => dialog.accept());
  }
}