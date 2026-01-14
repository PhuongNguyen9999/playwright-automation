import { Page } from '@playwright/test';
import { SITE_URLS } from './siteUrls';

export class BookStorePage {
  private page: Page;
  private searchBoxSelector = '#searchBox';
  private bookTitlesSelector = '.rt-tbody .rt-tr-group a';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(SITE_URLS.BOOKS, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async fillSearchBox(keyword: string) {
    const searchBox = this.page.locator(this.searchBoxSelector);
    await searchBox.fill(keyword);
  }

  async getBookTitles() {
    return this.page.locator(this.bookTitlesSelector);
  }

  async getBookCount() {
    const bookTitles = await this.getBookTitles();
    return await bookTitles.count();
  }

  async getBookTitleAtIndex(index: number) {
    const bookTitles = await this.getBookTitles();
    return await bookTitles.nth(index).innerText();
  }
}