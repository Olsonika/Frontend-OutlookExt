const { chromium } = require('playwright');

describe('Outlook Add-in Tests', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false }); // Set headless: true for CI
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Task pane loads correctly', async () => {
    // Navigate to the add-in's task pane
    await page.goto('https://localhost:3000/taskpane.html');

    // Check that the page loads and contains the correct title
    const title = await page.title();
    expect(title).toBe('Outlook Add-in Taskpane');

    // Verify a button or element exists
    const button = await page.locator('button#start');
    await expect(button).toHaveText('Start');
  });
});
