# Test info

- Name: value stream map should show correct improvements in different states
- Location: C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\value-stream-map.spec.js:5:1

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#process-stocktake')

    at C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\value-stream-map.spec.js:35:23
```

# Page snapshot

```yaml
- banner:
  - heading "SimplePharma Value Stream Map" [level=1]
  - button "Info"
- button "Current"
- button "Improved"
- button "Ideal"
- text: "Lead Time 59.9 hours Value-Added Time 10.8 hours Process Efficiency 18% Accuracy Rate 92.5% MedDev 🔗 ⏱️ DrugSeek 🔗 🎫 VitaFast 🔗 ⚖️ Receiving OEE: 97% 📶 🤖 🛡️ 📋 Storage OEE: 94% 📶 🔄 ☁️ 🧹 🎫 Internal Distribution OEE: 92% 🔄 🤖 ⏱️ 📋 👁️ Shop Floor OEE: 90% 📶 ⚡ 🎫 🧹 👁️ Stock Take OEE: 90% 📶 🤖 🧠 ⚡ 🛡️ 📋 📈 Customers WIP 🤖 ⏱️ Storage 🧠 🧹 Transit 🔄 ⚖️ Total Lead Time: 59.9 hours Process Cycle Efficiency: 18% Value-Added: 10.8 hours Non-Value-Added: 49.1 hours 📶 RFID Implementation 🤖 Process Automation ☁️ Cloud Integration 🔄 Layout Optimization 🧠 AI/ML Integration 👨‍🎓 Staff Training ⚡ Real-time Monitoring 🔗 Supplier Integration 🧹 5S Methodology 🎫 Kanban System 🛡️ Poka-Yoke 📋 Standard Work 👁️ Visual Management ⏱️ Just-In-Time 📈 Kaizen ⚖️ Heijunka"
```

# Test source

```ts
   1 | // @ts-check
   2 | const { test, expect } = require('@playwright/test');
   3 |
   4 | // Detailed test for the value stream map
   5 | test('value stream map should show correct improvements in different states', async ({ page }) => {
   6 |   // Navigate to the value stream map page
   7 |   await page.goto('file:///' + process.cwd() + '/build/define/value_stream_map/index.html');
   8 |
   9 |   // Wait for the app to fully render
  10 |   await page.waitForTimeout(2000);
  11 |   
  12 |   // Take a screenshot of the current state
  13 |   await page.screenshot({ path: 'value-stream-map-current.png' });
  14 |
  15 |   // Check that we're in the current state by default
  16 |   await expect(page.locator('.bg-blue-600.text-white')).toHaveText('Current');
  17 |   
  18 |   // First, check the current state - it should have waste icons but no improvements
  19 |   const currentImprovementIcons = await page.locator('.improvement-icon').count();
  20 |   expect(currentImprovementIcons).toBe(0);
  21 |   
  22 |   // Now switch to the improved state
  23 |   await page.click('button:has-text("Improved")');
  24 |   await page.waitForTimeout(1000);
  25 |   
  26 |   // Take a screenshot of the improved state
  27 |   await page.screenshot({ path: 'value-stream-map-improved.png' });
  28 |   
  29 |   // Verify we're in the improved state
  30 |   await expect(page.locator('.bg-blue-600.text-white')).toHaveText('Improved');
  31 |   
  32 |   // Check the stocktake process improvements in the improved state
  33 |   // It should have the specific improvements we designated for the "improved" state
  34 |   const stocktakeNode = page.locator('#process-stocktake');
> 35 |   await stocktakeNode.click();
     |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  36 |   
  37 |   // Check that we're showing the stocktake process details panel
  38 |   const detailsPanel = page.locator('.bg-white.border.rounded.shadow-lg');
  39 |   await expect(detailsPanel).toBeVisible();
  40 |   
  41 |   // Check that the improved state shows the correct improvements
  42 |   // For the stocktake process these should be more basic improvements from the Solution Selection Matrix
  43 |   await expect(detailsPanel).toContainText('Error-proofing checklists');
  44 |   await expect(detailsPanel).toContainText('Standardized counting procedures');
  45 |   await expect(detailsPanel).toContainText('Enhanced staff training program');
  46 |   await expect(detailsPanel).toContainText('Cycle counting redesign');
  47 |   await expect(detailsPanel).toContainText('Limited RFID tagging for high-value items only');
  48 |   
  49 |   // It should NOT contain the ideal state improvements
  50 |   await expect(detailsPanel).not.toContainText('Full RFID implementation eliminates manual counting');
  51 |   await expect(detailsPanel).not.toContainText('AI-powered inventory reconciliation');
  52 |   await expect(detailsPanel).not.toContainText('AWS cloud infrastructure for continuous monitoring');
  53 |   
  54 |   // Now switch to the ideal state
  55 |   await page.click('button:has-text("Ideal")');
  56 |   await page.waitForTimeout(1000);
  57 |   
  58 |   // Take a screenshot of the ideal state
  59 |   await page.screenshot({ path: 'value-stream-map-ideal.png' });
  60 |   
  61 |   // Verify we're in the ideal state
  62 |   await expect(page.locator('.bg-blue-600.text-white')).toHaveText('Ideal');
  63 |   
  64 |   // Click on the stocktake process again to refresh the details panel
  65 |   await stocktakeNode.click();
  66 |   
  67 |   // Check that the ideal state shows the correct advanced improvements
  68 |   await expect(detailsPanel).toContainText('Full RFID implementation eliminates manual counting');
  69 |   await expect(detailsPanel).toContainText('Continuous inventory tracking');
  70 |   await expect(detailsPanel).toContainText('AI-powered inventory reconciliation');
  71 |   await expect(detailsPanel).toContainText('AWS cloud infrastructure for continuous monitoring');
  72 |   await expect(detailsPanel).toContainText('Real-time accuracy monitoring dashboards');
  73 |   
  74 |   // It should NOT contain the basic improvements from the improved state
  75 |   await expect(detailsPanel).not.toContainText('Limited RFID tagging for high-value items only');
  76 |   
  77 |   // Verify the metrics change appropriately between states
  78 |   await expect(page.locator('text=Accuracy Rate')).toContainText('99.5%');
  79 | });
```