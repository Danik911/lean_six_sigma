# Test info

- Name: value stream map should show correct improvements in different states
- Location: C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\value-stream-map.spec.js:5:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('text=Accuracy Rate')
Expected string: "99.5%"
Received string: "Accuracy Rate"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('text=Accuracy Rate')
    9 × locator resolved to <span class="text-xs text-gray-500">Accuracy Rate</span>
      - unexpected value "Accuracy Rate"

    at C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\value-stream-map.spec.js:76:52
```

# Page snapshot

```yaml
- banner:
  - heading "SimplePharma Value Stream Map" [level=1]
  - button "Info"
- button "Current"
- button "Improved"
- button "Ideal"
- text: "Lead Time 34.3 hours Value-Added Time 9.9 hours Process Efficiency 28.9% Accuracy Rate 99.5% MedDev 🔗 🧠 DrugSeek 🔗 ☁️ VitaFast 🔗 ⚡ Receiving OEE: 99% 🤖 ☁️ 🛡️ 🧠 Storage OEE: 98% ☁️ 🧠 🤖 Internal Distribution OEE: 97% 🤖 ⏱️ ⚡ Shop Floor OEE: 96% ⚡ 🧠 👁️ 🤖 Stock Take OEE: 98% 🤖 🧠 ⚡ ☁️ Customers WIP 🤖 🧠 Storage 🧠 🤖 Transit 🤖 ⚡ Total Lead Time: 34.3 hours Process Cycle Efficiency: 28.9% Value-Added: 9.9 hours Non-Value-Added: 24.4 hours"
- heading "Stock Take" [level=3]
- button "X"
- paragraph: Real-time perpetual inventory eliminates traditional counting
- heading "Metrics:" [level=4]
- text: "oee Utilization: 98 accuracy: 99.5 process Time: 0"
- heading "Implemented Improvements:" [level=4]
- text: 🤖 Process Automation Continuous inventory tracking 🧠 AI/ML Integration AI-powered inventory reconciliation ⚡ Real-time Monitoring Real-time accuracy monitoring ☁️ Cloud Integration Cloud-based perpetual inventory system 📶 RFID Implementation 🤖 Process Automation ☁️ Cloud Integration 🔄 Layout Optimization 🧠 AI/ML Integration 👨‍🎓 Staff Training ⚡ Real-time Monitoring 🔗 Supplier Integration 🧹 5S Methodology 🎫 Kanban System 🛡️ Poka-Yoke 📋 Standard Work 👁️ Visual Management ⏱️ Just-In-Time 📈 Kaizen ⚖️ Heijunka
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
   9 |   // Wait for the app to fully render by looking for a visible element that indicates the React app is loaded
  10 |   await page.waitForSelector('.bg-blue-700', { state: 'visible', timeout: 10000 });
  11 |   await page.waitForTimeout(1000); // Additional small delay to ensure full rendering
  12 |   
  13 |   // Take a screenshot of the current state
  14 |   await page.screenshot({ path: 'value-stream-map-current.png' });
  15 |
  16 |   // Check that we're in the current state by default (note: the text is capitalized)
  17 |   await expect(page.locator('.bg-blue-600.text-white')).toContainText('Current');
  18 |   
  19 |   // First, check the current state - it should have waste icons but no improvements
  20 |   const currentImprovementIcons = await page.locator('.improvement-icon').count();
  21 |   expect(currentImprovementIcons).toBe(0);
  22 |   
  23 |   // Now switch to the improved state
  24 |   await page.click('button:has-text("Improved")');
  25 |   await page.waitForTimeout(1000);
  26 |   
  27 |   // Take a screenshot of the improved state
  28 |   await page.screenshot({ path: 'value-stream-map-improved.png' });
  29 |   
  30 |   // Verify we're in the improved state
  31 |   await expect(page.locator('.bg-blue-600.text-white')).toContainText('Improved');
  32 |   
  33 |   // Check the stocktake process improvements in the improved state
  34 |   // It should have the specific improvements we designated for the "improved" state
  35 |   const stocktakeNode = page.locator('[data-process-id="process-stocktake"]');
  36 |   await stocktakeNode.click();
  37 |   
  38 |   // Check that we're showing the stocktake process details panel
  39 |   const detailsPanel = page.locator('.bg-white.border.rounded.shadow-lg');
  40 |   await expect(detailsPanel).toBeVisible();
  41 |   
  42 |   // Check that the improved state shows the correct improvements
  43 |   // For the stocktake process these should be more basic improvements from the Solution Selection Matrix
  44 |   await expect(detailsPanel).toContainText('RFID-assisted counting');
  45 |   await expect(detailsPanel).toContainText('Error-proofing in counting process');
  46 |   await expect(detailsPanel).toContainText('Standardized counting procedures');
  47 |   await expect(detailsPanel).toContainText('Continuous improvement in inventory accuracy');
  48 |   
  49 |   // It should NOT contain the ideal state improvements
  50 |   await expect(detailsPanel).not.toContainText('AI-powered inventory reconciliation');
  51 |   await expect(detailsPanel).not.toContainText('Cloud-based perpetual inventory system');
  52 |   
  53 |   // Now switch to the ideal state
  54 |   await page.click('button:has-text("Ideal")');
  55 |   await page.waitForTimeout(1000);
  56 |   
  57 |   // Take a screenshot of the ideal state
  58 |   await page.screenshot({ path: 'value-stream-map-ideal.png' });
  59 |   
  60 |   // Verify we're in the ideal state
  61 |   await expect(page.locator('.bg-blue-600.text-white')).toContainText('Ideal');
  62 |   
  63 |   // Click on the stocktake process again to refresh the details panel
  64 |   await stocktakeNode.click();
  65 |   
  66 |   // Check that the ideal state shows the correct advanced improvements
  67 |   await expect(detailsPanel).toContainText('Continuous inventory tracking');
  68 |   await expect(detailsPanel).toContainText('AI-powered inventory reconciliation');
  69 |   await expect(detailsPanel).toContainText('Real-time accuracy monitoring');
  70 |   await expect(detailsPanel).toContainText('Cloud-based perpetual inventory system');
  71 |   
  72 |   // It should NOT contain the basic improvements from the improved state
  73 |   await expect(detailsPanel).not.toContainText('Standardized counting procedures');
  74 |   
  75 |   // Verify the metrics change appropriately between states
> 76 |   await expect(page.locator('text=Accuracy Rate')).toContainText('99.5%');
     |                                                    ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  77 | });
```