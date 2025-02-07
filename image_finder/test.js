const { chromium } = require('playwright');

(async () => {
    // Launch browser
    const browser = await chromium.launch({ headless: false }); // Set to false to see the browser
    const page = await browser.newPage();

    await page.goto('http://www.target.com');

    await page.waitForSelector('input[name="searchTerm"]');

    await page.click('input[name="searchTerm"]');

    await page.type('input[name="searchTerm"]', 'computer');

    await page.keyboard.press('Enter');

    await page.waitForSelector('.product-card');
    
    const newUrl = page.url();
    console.log(`New URL: ${newUrl}`);

    await browser.close();
})();