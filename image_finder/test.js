const { chromium } = require('playwright');

(async () => {
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('http://www.target.com');

    await page.waitForSelector('input[name="searchTerm"]');

    await page.click('input[name="searchTerm"]');

    await page.type('input[name="searchTerm"]', 'computer');

    await page.keyboard.press('Enter');

    await page.waitForSelector('[data-test="product-grid"]');
    
    await page.waitForSelector('[data-test="@web/ProductCard/ProductCardImage"]');

    let previousHeight = 0;
    let attempts = 0;
    while (attempts < 3) {
        previousHeight = await page.evaluate(() => window.scrollY);
        await page.evaluate(() => window.scrollBy(0, 500));
        
        await page.waitForTimeout(700);

        let newHeight = await page.evaluate(() => window.scrollY);
        if (newHeight === previousHeight) {
            break;
        }
        attempts++;
    }

    const productLinks = await page.$$eval('[data-test="product-grid"] a', (anchors) => {
        return [...new Set(
            anchors
                .map(a => a.href)
                .filter(href => href.includes('/p/') && !href.includes('review'))
        )];
    });

    const picLinks = await page.$$eval('[data-test="@web/ProductCard/ProductCardImage/primary"] source', (pics) => {
        return [...new Set(
            pics
                .map(source => source.srcset)
                .filter(srcset => srcset.includes('hei=500&wid=500'))
        )];
    });

    const pairedLinks = productLinks.slice(2, 8).map((link, index) => [
        link,
        picLinks[index + 2] || "No image"
    ]);
    
    console.log("Paired Product and Image Links:", pairedLinks);

    await browser.close();
})();