# Test info

- Name: Lean Six Sigma Site Tests >> Responsive design works on mobile size
- Location: C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\lean-six-sigma-site.spec.js:130:3

# Error details

```
Error: locator.screenshot: Target page, context or browser has been closed
Call log:
  - waiting for locator('.related-artifact').first()

    at C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\lean-six-sigma-site.spec.js:141:27
```

# Test source

```ts
   41 |     
   42 |     // Check for Project Charter - using more specific selector to avoid duplicates
   43 |     await expect(page.locator('.document-link.file-doc:has-text("Project Charter")').first()).toBeVisible();
   44 |     
   45 |     // Check for Related Artifacts section
   46 |     await expect(page.locator('h3:has-text("Related Artifacts in Other Phases")')).toBeVisible();
   47 |     
   48 |     // Verify cross-links to other phases
   49 |     const relatedPhases = page.locator('.related-phase');
   50 |     await expect(relatedPhases).toHaveCount(3); // Measure, Analyze, Improve
   51 |     
   52 |     // Check specific cross-link content
   53 |     await expect(page.locator('.related-phase.measure-phase')).toBeVisible();
   54 |     await expect(page.locator('.related-phase.analyze-phase')).toBeVisible();
   55 |     await expect(page.locator('.related-phase.improve-phase')).toBeVisible();
   56 |   });
   57 |
   58 |   test('Measure phase page shows cross-linking elements', async ({ page }) => {
   59 |     // Navigate to Measure phase page
   60 |     await page.click('nav li a[href="measure/index.html"]');
   61 |     
   62 |     // Check the page title
   63 |     await expect(page).toHaveTitle('Measure Phase - Lean Six Sigma Project');
   64 |     
   65 |     // Check for key artifacts
   66 |     await expect(page.locator('h3:has-text("Key Artifacts")')).toBeVisible();
   67 |     
   68 |     // Check for Related Artifacts section
   69 |     await expect(page.locator('h3:has-text("Related Artifacts in Other Phases")')).toBeVisible();
   70 |     
   71 |     // Verify cross-links to other phases
   72 |     const relatedPhases = page.locator('.related-phase');
   73 |     await expect(relatedPhases).toHaveCount(3); // Define, Analyze, Improve
   74 |     
   75 |     // Check specific cross-link content
   76 |     await expect(page.locator('.related-phase.define-phase')).toBeVisible();
   77 |     await expect(page.locator('.related-phase.analyze-phase')).toBeVisible();
   78 |     await expect(page.locator('.related-phase.improve-phase')).toBeVisible();
   79 |   });
   80 |
   81 |   test('Cross-linking navigation works correctly', async ({ page }) => {
   82 |     // Navigate to Define phase page
   83 |     await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/define/index.html');
   84 |     
   85 |     // Make sure the Related Artifacts section is visible
   86 |     await expect(page.locator('h3:has-text("Related Artifacts in Other Phases")')).toBeVisible();
   87 |     
   88 |     // First check if the elements exist and are visible
   89 |     await expect(page.locator('.related-phase.measure-phase')).toBeVisible();
   90 |     
   91 |     // Use a more specific selector for the link inside the Measure phase section
   92 |     await page.click('.related-content a[href="../measure/index.html#data-collection-plan"]');
   93 |     
   94 |     // Check we're now on the Measure page
   95 |     await expect(page).toHaveTitle('Measure Phase - Lean Six Sigma Project');
   96 |     
   97 |     // Now we're on measure page, check if Define phase link exists
   98 |     await expect(page.locator('.related-phase.define-phase')).toBeVisible();
   99 |     
  100 |     // Use a more specific selector for the link back to Define
  101 |     await page.click('.related-content a[href="../define/index.html#problem-statement"]');
  102 |     
  103 |     // Check we're back on the Define page
  104 |     await expect(page).toHaveTitle('Define Phase - Lean Six Sigma Project');
  105 |   });
  106 |
  107 |   test('Diagram toggle functionality works', async ({ page }) => {
  108 |     // Navigate to Define phase page
  109 |     await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/define/index.html');
  110 |     
  111 |     // Get a diagram container that should initially be hidden
  112 |     const sipocDiagram = page.locator('#sipoc-diagram');
  113 |     
  114 |     // Verify it's initially hidden
  115 |     await expect(sipocDiagram).toHaveCSS('display', 'none');
  116 |     
  117 |     // Click to show the diagram
  118 |     await page.click('a:has-text("SIPOC Diagram")');
  119 |     
  120 |     // Verify it's now visible
  121 |     await expect(sipocDiagram).toBeVisible();
  122 |     
  123 |     // Click again to hide it
  124 |     await page.click('a:has-text("SIPOC Diagram")');
  125 |     
  126 |     // Verify it's hidden again
  127 |     await expect(sipocDiagram).toHaveCSS('display', 'none');
  128 |   });
  129 |
  130 |   test('Responsive design works on mobile size', async ({ page }) => {
  131 |     // Set viewport to mobile size
  132 |     await page.setViewportSize({ width: 375, height: 667 });
  133 |     
  134 |     // Navigate to Define phase page
  135 |     await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/define/index.html');
  136 |     
  137 |     // Check that the Related Artifacts section adapts to mobile layout
  138 |     const relatedArtifact = page.locator('.related-artifact').first();
  139 |     
  140 |     // Take a screenshot for visual verification (useful for debugging)
> 141 |     await relatedArtifact.screenshot({ path: 'related-artifact-mobile.png' });
      |                           ^ Error: locator.screenshot: Target page, context or browser has been closed
  142 |     
  143 |     // Check that the content is still visible and usable - fix for strict mode violation
  144 |     await expect(page.locator('.related-content').first()).toBeVisible();
  145 |   });
  146 | });
```