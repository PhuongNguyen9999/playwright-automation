import { test, expect } from '@playwright/test';
  //test -> dùng để viết test case 
  //expect -> dùng để assert (verify kết quả)

test.describe('Search book with multiple results', () => {
  //test.describe dùng để group (nhóm) nhiều test case lại với nhau
  //Giống như một Test Suite
  //Trong report, bạn sẽ thấy:
  //Search book with multiple results
  //─ Search books with keyword: Design
  //─ Search books with keyword: design

  const searchKeywords = ['Design', 'design'];
  //Khai báo mảng dữ liệu test
  
  for (const keyword of searchKeywords) {
    //Lặp qua từng phần tử trong mảng searchKeywords
    //Mỗi vòng lặp sẽ tạo ra 1 test case riêng


    test(`Search books with keyword: ${keyword}`, async ({ page }) => {
    console.log(`\n Start test with keyword: "${keyword}"`);
      //Khai báo 1 test case
      //Tên test được tạo động
      //Khi chạy test, Playwright sẽ tạo ra 2 test:
      //Search books with keyword: Design
      //Search books with keyword: design

      //async ({ page })
      //Đây là test function
      //page là Playwright Page object. Đại diện cho 1 tab browser. Dùng để:
      //page.goto() /page.fill() /page.click() /page.locator() /Playwright tự động tạo browser + page cho bạn

      // 1. Navigate to Book Store page
      await page.goto('https://demoqa.com/books', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
      console.log('Navigated to Book Store page');

      // 2. Locate the search input
      const searchBox = page.locator('#searchBox');
      //const searchBox = page.getByPlaceholder('Type to search'); locator theo UI/UX Không phụ thuộc HTML structure

      // 3. Fill search keyword
      await searchBox.fill(keyword);
      console.log(`Filled search box with: "${keyword}"`);

      // 4. Get all visible book titles after searching
      const bookTitles = page.locator('.rt-tbody .rt-tr-group a');

      // 5. Get number of matched books
      const count = await bookTitles.count();
      console.log(`Number of books found: ${count}`);

      // 6. Verify at least one result is displayed
      expect(count).toBeGreaterThan(0);

      // 7. Verify each book title contains "design" (case-insensitive)
      for (let i = 0; i < count; i++) {
        const titleText = await bookTitles.nth(i).innerText();
        console.log(`Book ${i + 1}: ${titleText}`);
        //nth(i) -> phần tử thứ i
        //innerText() -> lấy text hiển thị

        expect(titleText.toLowerCase()).toContain('design');
        //lấy text -> Chuyển về chữ thường -> Kiểm tra có chứa "design"
      }
      console.log(`Test PASSED for keyword: "${keyword}"`);
    });
  }
});