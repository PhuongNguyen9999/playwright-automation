# Book Store Automation Testing

This project is an automation testing suite for a book store application using Playwright. It includes test cases for searching books by keywords and verifies the search results.

## Project Structure

```
TEST_PLAYWRIGHT
├── tests
│   ├── z-draft
│   │   ├── Scenario-1-Search-Book.spec.ts
│   │   └── Scenario-2-Search-Book.spec.ts
├── pages
│   └── BookStorePage.ts
├── playwright.config.ts
└── README.md
```

## Files Overview

- **tests/z-draft/Scenario-1-Search-Book.spec.ts**: Contains test cases for searching books with specific keywords. It navigates to the book store page, fills in the search box, and verifies that the search results contain the expected book titles.

- **tests/z-draft/Scenario-2-Search-Book.spec.ts**: Similar to Scenario-1, this file contains test cases for searching books, potentially with different keywords or scenarios.

- **pages/BookStorePage.ts**: Defines the `BookStorePage` class, encapsulating functionality related to the book store page, including methods for navigation, filling the search box, and retrieving search results.

- **playwright.config.ts**: Configuration file for Playwright, specifying settings for running tests, such as the browser to use, timeouts, and other test runner options.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```
   cd TEST_PLAYWRIGHT
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Run the tests**:
   ```
   npx playwright test
   ```

## Usage

- Modify the test cases in the `tests/z-draft` directory to add new scenarios or change existing ones.
- Update the `BookStorePage.ts` file to add new methods or modify existing ones as needed.
- Adjust the `playwright.config.ts` file for different browser configurations or test settings.

## Contributing

Feel free to submit issues or pull requests for improvements or additional features.