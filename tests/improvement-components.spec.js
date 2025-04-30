const { test, expect } = require('@playwright/test');

/**
 * Test to verify that the Improve page components load correctly
 * Including the 5S app and Kanban system components
 */
test('Improve page components load and render correctly', async ({ page }) => {
  // Navigate to the Improve page
  await page.goto('file://c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/improve/index.html');

  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');

  // Check if the placeholders are visible
  await expect(page.locator('.placeholder-container').first()).toBeVisible();
  await expect(page.locator('.placeholder-container').nth(1)).toBeVisible();

  // Check that the direct links to Claude artifacts are present with their correct text
  const fiveS_main_link = page.getByRole('link', { name: /Open 5S Digital Organization System/i });
  await expect(fiveS_main_link).toBeVisible();
  
  const kanban_main_link = page.getByRole('link', { name: /Open Digital Kanban System/i });
  await expect(kanban_main_link).toBeVisible();
  
  // Verify the link URLs
  await expect(fiveS_main_link).toHaveAttribute('href', 'https://claude.ai/public/artifacts/91ff4525-34f3-4247-b7c0-993acd0df00e');
  await expect(kanban_main_link).toHaveAttribute('href', 'https://claude.ai/public/artifacts/554808fc-8635-47da-8b06-bfb9c03592ab');
  
  // Take a screenshot of the page to visually verify the components
  await page.screenshot({ path: 'test-results/improve-page-components.png', fullPage: true });
  
  console.log('✅ Improve page components test completed successfully');
});

/**
 * Test to verify that the links in the tool-links-container section are configured correctly
 */
test('Claude artifact links are configured correctly', async ({ page }) => {
  // Navigate to the Improve page
  await page.goto('file://c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/improve/index.html');
  
  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');

  // Use more specific selectors to avoid ambiguity
  const toolLinksContainer = page.locator('.tool-links-container');
  
  // Check the 5S app link within the tool-links-container
  const fiveS_link = toolLinksContainer.getByRole('link', { name: /5S Digital Organization System/i });
  await expect(fiveS_link).toHaveAttribute('target', '_blank');
  await expect(fiveS_link).toHaveClass(/external-tool-link/);
  await expect(fiveS_link).toHaveAttribute('href', 'https://claude.ai/public/artifacts/91ff4525-34f3-4247-b7c0-993acd0df00e');
  
  // Check the Kanban system link within the tool-links-container
  const kanban_link = toolLinksContainer.getByRole('link', { name: /Kanban System/i });
  await expect(kanban_link).toHaveAttribute('target', '_blank');
  await expect(kanban_link).toHaveClass(/external-tool-link/);
  await expect(kanban_link).toHaveAttribute('href', 'https://claude.ai/public/artifacts/554808fc-8635-47da-8b06-bfb9c03592ab');
  
  console.log('✅ Claude artifact links test completed successfully');
});