// @ts-check
const { test, expect } = require('@playwright/test');

// Detailed test for the value stream map
test('value stream map should show correct improvements in different states', async ({ page }) => {
  // Navigate to the value stream map page
  await page.goto('file:///' + process.cwd() + '/build/define/value_stream_map/index.html');

  // Wait for the app to fully render
  await page.waitForTimeout(2000);
  
  // Take a screenshot of the current state
  await page.screenshot({ path: 'value-stream-map-current.png' });

  // Check that we're in the current state by default
  await expect(page.locator('.bg-blue-600.text-white')).toHaveText('Current');
  
  // First, check the current state - it should have waste icons but no improvements
  const currentImprovementIcons = await page.locator('.improvement-icon').count();
  expect(currentImprovementIcons).toBe(0);
  
  // Now switch to the improved state
  await page.click('button:has-text("Improved")');
  await page.waitForTimeout(1000);
  
  // Take a screenshot of the improved state
  await page.screenshot({ path: 'value-stream-map-improved.png' });
  
  // Verify we're in the improved state
  await expect(page.locator('.bg-blue-600.text-white')).toHaveText('Improved');
  
  // Check the stocktake process improvements in the improved state
  // It should have the specific improvements we designated for the "improved" state
  const stocktakeNode = page.locator('#process-stocktake');
  await stocktakeNode.click();
  
  // Check that we're showing the stocktake process details panel
  const detailsPanel = page.locator('.bg-white.border.rounded.shadow-lg');
  await expect(detailsPanel).toBeVisible();
  
  // Check that the improved state shows the correct improvements
  // For the stocktake process these should be more basic improvements from the Solution Selection Matrix
  await expect(detailsPanel).toContainText('Error-proofing checklists');
  await expect(detailsPanel).toContainText('Standardized counting procedures');
  await expect(detailsPanel).toContainText('Enhanced staff training program');
  await expect(detailsPanel).toContainText('Cycle counting redesign');
  await expect(detailsPanel).toContainText('Limited RFID tagging for high-value items only');
  
  // It should NOT contain the ideal state improvements
  await expect(detailsPanel).not.toContainText('Full RFID implementation eliminates manual counting');
  await expect(detailsPanel).not.toContainText('AI-powered inventory reconciliation');
  await expect(detailsPanel).not.toContainText('AWS cloud infrastructure for continuous monitoring');
  
  // Now switch to the ideal state
  await page.click('button:has-text("Ideal")');
  await page.waitForTimeout(1000);
  
  // Take a screenshot of the ideal state
  await page.screenshot({ path: 'value-stream-map-ideal.png' });
  
  // Verify we're in the ideal state
  await expect(page.locator('.bg-blue-600.text-white')).toHaveText('Ideal');
  
  // Click on the stocktake process again to refresh the details panel
  await stocktakeNode.click();
  
  // Check that the ideal state shows the correct advanced improvements
  await expect(detailsPanel).toContainText('Full RFID implementation eliminates manual counting');
  await expect(detailsPanel).toContainText('Continuous inventory tracking');
  await expect(detailsPanel).toContainText('AI-powered inventory reconciliation');
  await expect(detailsPanel).toContainText('AWS cloud infrastructure for continuous monitoring');
  await expect(detailsPanel).toContainText('Real-time accuracy monitoring dashboards');
  
  // It should NOT contain the basic improvements from the improved state
  await expect(detailsPanel).not.toContainText('Limited RFID tagging for high-value items only');
  
  // Verify the metrics change appropriately between states
  await expect(page.locator('text=Accuracy Rate')).toContainText('99.5%');
});