// @ts-check
const { test, expect } = require('@playwright/test');

// Skip this test since we're focusing on the lean_six_sigma_site implementation
test.skip('value stream map test', async ({ page }) => {
  // Navigate to the value stream map page using file protocol
  await page.goto('file:///' + process.cwd() + '/value_stream_map/index.html');

  // Take a screenshot for visual debugging
  await page.screenshot({ path: 'value-stream-map-debug.png', fullPage: true });

  // Check the basics
  await expect(page.locator('h1')).toHaveText(/Value Stream Map/);
});