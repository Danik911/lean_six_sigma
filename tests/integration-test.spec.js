const { test, expect } = require('@playwright/test');

test('5S and Kanban integration test', async ({ page }) => {
  // Navigate to the improve page
  await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/build/improve/index.html');
  
  // 1. Test the 5S App integration
  console.log('Testing 5S App integration...');
  
  // Find and click the 5S App link
  const fiveSLink = page.locator('text=5S Digital Organization System');
  await expect(fiveSLink).toBeVisible();
  await fiveSLink.click();
  
  // Check if the iframe container becomes visible
  const fiveSIframeContainer = page.locator('#5s-app-iframe-container');
  await expect(fiveSIframeContainer).toBeVisible();
  
  // Get the iframe element
  const fiveSIframe = fiveSIframeContainer.locator('iframe');
  await expect(fiveSIframe).toBeVisible();
  
  // Take a screenshot of the 5S app
  await page.screenshot({ path: 'test-results/5s-app-integration.png' });
  
  // Click the link again to collapse the iframe
  await fiveSLink.click();
  await expect(fiveSIframeContainer).not.toBeVisible();
  
  // 2. Test the Kanban System integration
  console.log('Testing Kanban System integration...');
  
  // Find and click the Kanban System link
  const kanbanLink = page.locator('text=Digital Kanban System');
  await expect(kanbanLink).toBeVisible();
  await kanbanLink.click();
  
  // Check if the iframe container becomes visible
  const kanbanIframeContainer = page.locator('#kanban-iframe-container');
  await expect(kanbanIframeContainer).toBeVisible();
  
  // Get the iframe element
  const kanbanIframe = kanbanIframeContainer.locator('iframe');
  await expect(kanbanIframe).toBeVisible();
  
  // Take a screenshot of the Kanban system
  await page.screenshot({ path: 'test-results/kanban-system-integration.png' });
  
  // Click the link again to collapse the iframe
  await kanbanLink.click();
  await expect(kanbanIframeContainer).not.toBeVisible();
  
  console.log('Integration test completed successfully!');
});