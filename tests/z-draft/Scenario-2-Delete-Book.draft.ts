import { test, expect, request } from '@playwright/test';
//test → Dùng để định nghĩa test case, test suite (test.describe, test.beforeEach, test()).
//expect → Dùng để assert / verify kết quả (giống assertion trong manual test).
//request → Dùng để gửi API request (GET, POST, DELETE…)

const USERNAME = 'phuong.playwright001';
const PASSWORD = 'PhuongNguyen@12345';
const USER_ID = 'f2971715-cab9-4084-8e33-2ea3eda2866d';
const ISBN = '9781449331818';
const BOOK_NAME = 'Learning JavaScript Design Patterns';
//Khai báo dữ liệu test (Test Data)

test.describe('Delete book successfully', () => {
//test.describe = Test Suite. Nhóm tất cả test liên quan đến Delete book successfully
  // ==========================
  // PRECONDITION: Add book via API
  // ==========================
  test.beforeEach(async () => {
    //Code trong beforeEach sẽ chạy trước MỖI test
    //Đảm bảo luôn có book để delete

    const apiContext = await request.newContext({
      baseURL: 'https://demoqa.com',
      extraHTTPHeaders: {
        Authorization:
          'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    });
    //request.newContext() → Tạo API session riêng (giống Postman environment)
    //baseURL → Khi gọi API: apiContext.post('/BookStore/v1/Books')
    //Playwright sẽ tự hiểu thành: https://demoqa.com/BookStore/v1/Books
    //Authorization: Basic -> dùng Basic Auth
    //Buffer.from(...).toString('base64') -> Encode username:password thành Base64

    const response = await apiContext.post('/BookStore/v1/Books', {
      data: {
        userId: USER_ID,
        collectionOfIsbns: [
          { isbn: ISBN }
        ]
      }
    //Gửi POST request để add book
    //POST: https://demoqa.com/BookStore/v1/Books
    //{
    //    "userId": "...",
    //    "collectionOfIsbns": [
    //      { "isbn": "9781449331818" }
    //    ]
    //  }
    });

    console.log('Add book API status:', response.status());
    //In ra status code sau khi gửi API request. Debug khi test fail
  });

  // ==========================
  // TEST CASE
  // ==========================
  test('Delete book from profile', async ({ page }) => {
  //Khai báo 1 test case
  //{ page } -> Playwright tự mở browser -> Tạo 1 tab mới -> thao tác UI thông qua page

    console.log('Login to application');

    await page.goto('https://demoqa.com/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
  //waitUntil: 'domcontentloaded' ->  Playwright sẽ chờ cho sự kiện DOMContentLoaded xảy ra rồi mới tiếp tục chạy các dòng code phía sau.
  //DOMContentLoaded xảy ra khi: Trình duyệt đã tải xong HTML
  //Nhưng chưa cần: Tải xong hình ảnh; Tải xong CSS; Tải xong font; Tải xong iframe
  //timeout: 60000 -> Tránh lỗi timeout do mạng chậm

    await page.fill('#userName', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login');

    // Verify login success
    await expect(page.locator('#userName-value')).toHaveText(USERNAME);
    //Sau khi login thành công -> kiểm tra trang hiển thị username ở góc phải
    //Assertion này đảm bảo Login thành công. Nếu fail → dừng test sớm

    console.log('Navigate to Profile page');
    await page.goto('https://demoqa.com/profile');
    //Mở trang Profile – nơi hiển thị danh sách book

    console.log('Search book');
    await page.fill('#searchBox', BOOK_NAME);
    //Filter danh sách book theo tên

    const bookTitle = page.getByRole('link', { name: BOOK_NAME });
    await expect(bookTitle).toBeVisible();
    //Lấy locator theo Playwright locator
    //Verify: Book tồn tại trước khi delete

    console.log('Click Delete button');
    await page.locator('#delete-record-undefined').click();
    //Click icon Delete của book


    console.log('Confirm delete');
    await page.getByRole('button', { name: 'OK' }).click();
    //Click OK trong popup confirm

    console.log('Accept alert');
    page.once('dialog', dialog => dialog.accept());
    //Bắt browser alert -> Click OK

    // Verify book is NOT shown
    await expect(bookTitle).toHaveCount(0);
    //Sau khi delete -> Locator book phải không còn tồn tại

    console.log('Book deleted successfully');
  });

});