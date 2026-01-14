import { test, expect } from '@playwright/test';
  //test → dùng để viết test case 
  //expect → dùng để assert (verify kết quả)

test.describe('Search book with multiple results', () => {
  //test.describe dùng để group (nhóm) nhiều test case lại với nhau
  //Giống như một Test Suite
  //Trong report, bạn sẽ thấy:
  //Search book with multiple results
  //─ Search books with keyword: Design
  //─ Search books with keyword: design

  const searchKeywords = ['Design', 'design', 'java'];
  //Khai báo mảng dữ liệu test

  for (const keyword of searchKeywords) {
    //Lặp qua từng phần tử trong mảng searchKeywords
    //Mỗi vòng lặp sẽ tạo ra 1 test case riêng

    test(`Search books with keyword: ${keyword}`, async ({ page }) => {
      //Khai báo 1 test case
      //Tên test được tạo động
      //Khi chạy test, Playwright sẽ tạo ra 2 test:
      //✓ Search books with keyword: Design
      //✓ Search books with keyword: design

      //async ({ page })
      //Đây là test function
      //page là Playwright Page object. Đại diện cho 1 tab browser. Dùng để:
      //page.goto() /page.fill() /page.click() /page.locator() /Playwright tự động tạo browser + page cho bạn

      // 1. Navigate to Book Store page
      await page.goto('https://demoqa.com/books');

      // 2. Locate the search input
      const searchBox = page.locator('#searchBox');
      //const searchBox = page.getByPlaceholder('Type to search'); locator theo UI/UX Không phụ thuộc HTML structure

      // 3. Fill search keyword
      await searchBox.fill(keyword);

      // 4. Get all visible book titles after searching
      const bookTitles = page.locator('.rt-tbody .rt-tr-group a');

      // 5. Get number of matched books
      const count = await bookTitles.count();

      // 6. Verify at least one result is displayed
      expect(count).toBeGreaterThan(0);

      // 7. Collect invalid book titles
      const invalidBooks: string[] = [];
      //Tạo một mảng rỗng Kiểu dữ liệu là string[] → mảng chứa tên sách

      for (let i = 0; i < count; i++) {
        const titleText = await bookTitles.nth(i).innerText();
        //nth(i) → phần tử thứ i
        //innerText() → lấy text hiển thị

        // Check case-insensitive
        if (!titleText.toLowerCase().includes('design')) {
        //! (phủ định) Nghĩa là: KHÔNG chứa "design"

          invalidBooks.push(titleText);
        //Nếu title không chứa "design" Thì thêm tên sách đó vào mảng invalidBooks
        }
      }

      // 8. Fail test & show detail if any invalid books found
      if (invalidBooks.length > 0) {
      //Kiểm tra: Có ít nhất 1 cuốn sách sai hay không

        throw new Error(
          //throw new Error(...) Chủ động fail test

          `Found books that do NOT match search keyword "${keyword}":\n` +
          invalidBooks.join('\n')
          //${keyword} Hiển thị keyword đã search (Design hoặc design)
          //invalidBooks.join('\n') In ra mỗi sách 1 dòng
        );
      }
    });
  }
});