import { Page, expect } from '@playwright/test';
// Import Page để điều khiển trình duyệt
// Import expect để dùng assert kiểm tra kết quả

export class LoginPage {
  // Khai báo class đại diện cho trang Login

  constructor(private page: Page) {}
  // Constructor nhận vào đối tượng page của Playwright
  // private page → chỉ dùng nội bộ trong class

  async goto() {
    // Hàm mở trang login
    await this.page.goto('https://demoqa.com/login', {
      waitUntil: 'domcontentloaded'
      // Đợi load xong HTML
    });
  }

  async login(username: string, password: string) {
    // Hàm thực hiện đăng nhập

    await this.page.fill('#userName', username);
    // Nhập username vào ô input

    await this.page.fill('#password', password);
    // Nhập password

    await this.page.click('#login');
    // Click nút Login
  }

  async verifyLoginSuccess(username: string) {
    // Hàm kiểm tra login thành công

    await expect(this.page.locator('#userName-value')).toHaveText(username);
    // Kiểm tra username hiển thị đúng
  }
}