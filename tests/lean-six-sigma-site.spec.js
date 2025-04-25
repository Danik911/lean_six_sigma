// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Lean Six Sigma Site Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the local lean_six_sigma_site
    await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/index.html');
  });

  test('Main landing page loads correctly', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle('Lean Six Sigma Project');
    
    // Check for main heading
    const heading = page.locator('h1:has-text("Lean Six Sigma Project")');
    await expect(heading).toBeVisible();
    
    // Verify navigation links to all DMAIC phases
    const navLinks = page.locator('nav li a');
    await expect(navLinks).toHaveCount(6); // Introduction + 5 DMAIC phases
    
    // Check content sections are present
    await expect(page.locator('section.intro-section')).toBeVisible();
    await expect(page.locator('.dmaic-container')).toBeVisible();
  });

  test('Define phase page shows cross-linking elements', async ({ page }) => {
    // Navigate to Define phase page
    await page.click('nav li a[href="define/index.html"]');
    
    // Check the page title
    await expect(page).toHaveTitle('Define Phase - Lean Six Sigma Project');
    
    // Check for key artifacts
    await expect(page.locator('h3:has-text("Key Artifacts")')).toBeVisible();
    
    // Verify document links are present - fix for strict mode violation
    const documentLinks = page.locator('.document-link').first();
    await expect(documentLinks).toBeVisible();
    
    // Check for Project Charter - using more specific selector to avoid duplicates
    await expect(page.locator('.document-link.file-doc:has-text("Project Charter")').first()).toBeVisible();
    
    // Check for Related Artifacts section
    await expect(page.locator('h3:has-text("Related Artifacts in Other Phases")')).toBeVisible();
    
    // Verify cross-links to other phases
    const relatedPhases = page.locator('.related-phase');
    await expect(relatedPhases).toHaveCount(3); // Measure, Analyze, Improve
    
    // Check specific cross-link content
    await expect(page.locator('.related-phase.measure-phase')).toBeVisible();
    await expect(page.locator('.related-phase.analyze-phase')).toBeVisible();
    await expect(page.locator('.related-phase.improve-phase')).toBeVisible();
  });

  test('Measure phase page shows cross-linking elements', async ({ page }) => {
    // Navigate to Measure phase page
    await page.click('nav li a[href="measure/index.html"]');
    
    // Check the page title
    await expect(page).toHaveTitle('Measure Phase - Lean Six Sigma Project');
    
    // Check for key artifacts
    await expect(page.locator('h3:has-text("Key Artifacts")')).toBeVisible();
    
    // Check for Related Artifacts section
    await expect(page.locator('h3:has-text("Related Artifacts in Other Phases")')).toBeVisible();
    
    // Verify cross-links to other phases
    const relatedPhases = page.locator('.related-phase');
    await expect(relatedPhases).toHaveCount(3); // Define, Analyze, Improve
    
    // Check specific cross-link content
    await expect(page.locator('.related-phase.define-phase')).toBeVisible();
    await expect(page.locator('.related-phase.analyze-phase')).toBeVisible();
    await expect(page.locator('.related-phase.improve-phase')).toBeVisible();
  });

  test('Cross-linking navigation works correctly', async ({ page }) => {
    // Navigate to Define phase page
    await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/define/index.html');
    
    // Make sure the Related Artifacts section is visible
    await expect(page.locator('h3:has-text("Related Artifacts in Other Phases")')).toBeVisible();
    
    // First check if the elements exist and are visible
    await expect(page.locator('.related-phase.measure-phase')).toBeVisible();
    
    // Use a more specific selector for the link inside the Measure phase section
    await page.click('.related-content a[href="../measure/index.html#data-collection-plan"]');
    
    // Check we're now on the Measure page
    await expect(page).toHaveTitle('Measure Phase - Lean Six Sigma Project');
    
    // Now we're on measure page, check if Define phase link exists
    await expect(page.locator('.related-phase.define-phase')).toBeVisible();
    
    // Use a more specific selector for the link back to Define
    await page.click('.related-content a[href="../define/index.html#problem-statement"]');
    
    // Check we're back on the Define page
    await expect(page).toHaveTitle('Define Phase - Lean Six Sigma Project');
  });

  test('Diagram toggle functionality works', async ({ page }) => {
    // Navigate to Define phase page
    await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/define/index.html');
    
    // Get a diagram container that should initially be hidden
    const sipocDiagram = page.locator('#sipoc-diagram');
    
    // Verify it's initially hidden
    await expect(sipocDiagram).toHaveCSS('display', 'none');
    
    // Click to show the diagram
    await page.click('a:has-text("SIPOC Diagram")');
    
    // Verify it's now visible
    await expect(sipocDiagram).toBeVisible();
    
    // Click again to hide it
    await page.click('a:has-text("SIPOC Diagram")');
    
    // Verify it's hidden again
    await expect(sipocDiagram).toHaveCSS('display', 'none');
  });

  test('Responsive design works on mobile size', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to Define phase page
    await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/define/index.html');
    
    // Check that the Related Artifacts section adapts to mobile layout
    const relatedArtifact = page.locator('.related-artifact').first();
    
    // Take a screenshot for visual verification (useful for debugging)
    await relatedArtifact.screenshot({ path: 'related-artifact-mobile.png' });
    
    // Check that the content is still visible and usable - fix for strict mode violation
    await expect(page.locator('.related-content').first()).toBeVisible();
  });
});