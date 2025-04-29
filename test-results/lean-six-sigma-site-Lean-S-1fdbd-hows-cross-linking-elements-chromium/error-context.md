# Test info

- Name: Lean Six Sigma Site Tests >> Define phase page shows cross-linking elements
- Location: C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\lean-six-sigma-site.spec.js:28:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected string: "Define Phase - Lean Six Sigma Project"
Received string: "Define Phase - SimplePharma Lean Six Sigma Project"
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html lang="en">…</html>
      - unexpected value "Define Phase - SimplePharma Lean Six Sigma Project"

    at C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\lean-six-sigma-site.spec.js:33:24
```

# Page snapshot

```yaml
- banner:
  - heading "Lean Six Sigma Project" [level=1]
  - navigation:
    - list:
      - listitem:
        - link "Introduction":
          - /url: ../index.html
      - listitem:
        - link "Define":
          - /url: "#"
      - listitem:
        - link "Measure":
          - /url: ../measure/index.html
      - listitem:
        - link "Analyze":
          - /url: ../analyze/index.html
      - listitem:
        - link "Improve":
          - /url: ../improve/index.html
      - listitem:
        - link "Control":
          - /url: ../control/index.html
- main:
  - heading "Define Phase" [level=1]
  - paragraph: The Define phase establishes the scope, goals, and deliverables of the project. This phase identifies the voice of the customer, process stakeholders, and aligns the team around key objectives.
  - heading "Value Stream Map & Process Flow Diagram Integration" [level=2]
  - paragraph: Explore the integrated view of SimplePharma's inventory management processes. This tool connects high-level Value Stream Map analysis with detailed Process Flow Diagrams to provide a comprehensive view of the entire operation.
  - paragraph: Use this integration to understand how individual process improvements impact the overall value stream.
  - link "Explore Integrated View":
    - /url: process_integration.html
  - heading "Key Define Phase Tools" [level=2]
  - img "Value Stream Map"
  - heading "Value Stream Map" [level=3]
  - paragraph: Visualizes the flow of materials and information needed to deliver a product or service to the customer, highlighting value-added and non-value-added activities.
  - link "View Tool":
    - /url: value_stream_map/index.html
  - img "Process Flow Diagram"
  - heading "Process Flow Diagram" [level=3]
  - paragraph: A detailed visualization of process steps showing the sequence of activities, decision points, and pathways through the system.
  - link "View Tool":
    - /url: process_flow_diagram/stocktake_process.html
  - img "Project Charter"
  - heading "Project Charter" [level=3]
  - paragraph: Defines the purpose, scope, objectives, and participants in a project, establishing the foundation for the project plan.
  - link "View Tool":
    - /url: ../artifacts/Project-charter-SimplePharma.docx
  - img "SIPOC Diagram"
  - heading "SIPOC Diagram" [level=3]
  - paragraph: Summarizes the Suppliers, Inputs, Process, Outputs, and Customers of a business process, providing a high-level overview.
  - link "View Tool":
    - /url: ../artifacts/SIPOC.pdf
  - img "Swim Lane Diagram"
  - heading "Swim Lane Diagram" [level=3]
  - paragraph: Visualizes complex processes across multiple departments or roles, clarifying responsibilities and handoffs.
  - link "View Tool":
    - /url: ../artifacts/Swimlane Diagram.pdf
  - img "Cause and Effect Diagram"
  - heading "Cause and Effect Diagram" [level=3]
  - paragraph: Identifies many possible causes for an effect or problem, organizing ideas into categories to focus improvement efforts.
  - link "View Tool":
    - /url: ../artifacts/Cause and Effect Diagram.jpg
- contentinfo:
  - paragraph: © 2025 Lean Six Sigma Project. All rights reserved.
```

# Test source

```ts
   1 | // @ts-check
   2 | const { test, expect } = require('@playwright/test');
   3 |
   4 | test.describe('Lean Six Sigma Site Tests', () => {
   5 |   
   6 |   test.beforeEach(async ({ page }) => {
   7 |     // Navigate to the local lean_six_sigma_site
   8 |     await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/lean_six_sigma_site/index.html');
   9 |   });
   10 |
   11 |   test('Main landing page loads correctly', async ({ page }) => {
   12 |     // Check that the page title is correct
   13 |     await expect(page).toHaveTitle('Lean Six Sigma Project');
   14 |     
   15 |     // Check for main heading
   16 |     const heading = page.locator('h1:has-text("Lean Six Sigma Project")');
   17 |     await expect(heading).toBeVisible();
   18 |     
   19 |     // Verify navigation links to all DMAIC phases
   20 |     const navLinks = page.locator('nav li a');
   21 |     await expect(navLinks).toHaveCount(6); // Introduction + 5 DMAIC phases
   22 |     
   23 |     // Check content sections are present
   24 |     await expect(page.locator('section.intro-section')).toBeVisible();
   25 |     await expect(page.locator('.dmaic-container')).toBeVisible();
   26 |   });
   27 |
   28 |   test('Define phase page shows cross-linking elements', async ({ page }) => {
   29 |     // Navigate to Define phase page
   30 |     await page.click('nav li a[href="define/index.html"]');
   31 |     
   32 |     // Check the page title
>  33 |     await expect(page).toHaveTitle('Define Phase - Lean Six Sigma Project');
      |                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
   34 |     
   35 |     // Check for key artifacts
   36 |     await expect(page.locator('h3:has-text("Key Artifacts")')).toBeVisible();
   37 |     
   38 |     // Verify document links are present - fix for strict mode violation
   39 |     const documentLinks = page.locator('.document-link').first();
   40 |     await expect(documentLinks).toBeVisible();
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
```