import { test, expect } from '@playwright/test';

test('value stream map test', async ({ page }) => {
  // Navigate to the value stream map page using file protocol
  await page.goto('file:///' + process.cwd() + '/value_stream_map/index.html');
  
  // Take a screenshot for visual debugging
  await page.screenshot({ path: 'value-stream-map-debug.png', fullPage: true });
  
  // Log the page content to see if anything is being rendered
  console.log('Debugging value stream map...');
  
  // Check if there are any console errors
  page.on('console', msg => {
    console.log(`Browser console ${msg.type()}: ${msg.text()}`);
  });
  
  // Wait to ensure any async rendering completes
  await page.waitForTimeout(2000);
});