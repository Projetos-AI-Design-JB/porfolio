const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to page...');
  await page.goto('https://skeleton-rebuild.preview.emergentagent.com/', { waitUntil: 'load', timeout: 60000 });
  
  console.log('Waiting for animations to unfold...');
  await page.waitForTimeout(4000); // 4 seconds to wait for initial load/animations
  
  console.log('Capturing screenshot...');
  await page.screenshot({ path: 'page_screenshot.png', fullPage: true });
  
  await browser.close();
  console.log('Done.');
})();