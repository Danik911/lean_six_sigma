const { test, expect } = require('@playwright/test');

test('VitaFast node text description is displayed correctly', async ({ page }) => {
  // Navigate to the value stream map page
  await page.goto('file://' + process.cwd() + '/lean_six_sigma_site/define/value_stream_map/index.html');
  
  // Wait for the page to load completely
  await page.waitForSelector('[data-process-id="supplier-vitafast"]');
  
  // Click on the VitaFast node
  await page.click('[data-process-id="supplier-vitafast"]');
  
  // Wait for the details panel to appear
  await page.waitForSelector('.process-details-panel');
  
  // Check that the details panel contains the expected text
  const panelContent = await page.textContent('.process-details-panel');
  expect(panelContent).toContain('VitaFast');
  expect(panelContent).toContain('Supplementary supplier');
  
  // Check that the details panel is visible and within viewport bounds
  const panelBoundingBox = await page.locator('.process-details-panel').boundingBox();
  
  // Take a screenshot for visual verification
  await page.screenshot({ path: 'vitafast-node-test.png' });
  
  // Check that the panel is fully within the viewport bounds
  const viewportSize = page.viewportSize();
  expect(panelBoundingBox.x).toBeGreaterThanOrEqual(0);
  expect(panelBoundingBox.y).toBeGreaterThanOrEqual(0);
  expect(panelBoundingBox.x + panelBoundingBox.width).toBeLessThanOrEqual(viewportSize.width);
  expect(panelBoundingBox.y + panelBoundingBox.height).toBeLessThanOrEqual(viewportSize.height);
});