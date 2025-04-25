# Test info

- Name: 5S and Kanban integration test
- Location: C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\integration-test.spec.js:3:1

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('text=5S Digital Organization System') resolved to 3 elements:
    1) <h3>Interactive 5S Digital Organization System</h3> aka getByRole('heading', { name: 'Interactive 5S Digital' })
    2) <span>5S Digital Organization System</span> aka getByRole('link', { name: ' 5S Digital Organization' })
    3) <p>This interactive 5S Digital Organization System d…</p> aka getByText('This interactive 5S Digital')

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=5S Digital Organization System')

    at C:\Users\anteb\OneDrive\Desktop\Griffith\Lean Six Sigma\assignment\My version\lean_six_sigma\tests\integration-test.spec.js:12:27
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
          - /url: ../define/index.html
      - listitem:
        - link "Measure":
          - /url: ../measure/index.html
      - listitem:
        - link "Analyze":
          - /url: ../analyze/index.html
      - listitem:
        - link "Improve":
          - /url: index.html
      - listitem:
        - link "Control":
          - /url: ../control/index.html
- main:
  - heading "Improve Phase" [level=2]
  - heading "Phase Overview" [level=3]
  - paragraph: The Improve phase focuses on developing, testing, and implementing solutions to address the root causes identified in the Analyze phase. We used lean principles to redesign key aspects of the inventory management process, eliminate waste, and create more effective workflows.
  - heading "Key Artifacts" [level=3]
  - link " Value Stream Map":
    - /url: "#"
  - iframe
  - paragraph: The Value Stream Map visualizes the flow of materials and information in the inventory management process, highlighting value-added and non-value-added activities. This map helped identify opportunities for waste reduction and process optimization.
  - link " Process Flow Diagram":
    - /url: "#"
  - iframe
  - paragraph: The redesigned Process Flow Diagram shows the improved inventory count procedure with standardized steps, error-proofing measures, and clear responsibilities.
  - link " Value Stream Analysis":
    - /url: "#"
  - text: Loading content...
  - paragraph: Detailed analysis of the value stream, including cycle times, waiting times, and improvement opportunities identified during the mapping exercise.
  - heading "Value Stream Approach" [level=3]
  - heading "Value Stream Mapping Methodology" [level=4]
  - paragraph: "Our value stream mapping process followed these steps:"
  - list:
    - listitem: Identified inventory process boundaries and key stakeholders
    - listitem: Documented the current state with cycle times, waiting times, and information flow
    - listitem: Analyzed the map to identify non-value-added activities and bottlenecks
    - listitem: Created a future state map incorporating lean principles
    - listitem: Developed an implementation plan based on the future state vision
  - paragraph: The interactive Value Stream Map linked above allows you to explore both the current and future states, with detailed metrics for each process step.
  - heading "Solution Selection Matrix" [level=3]
  - paragraph: "We used a structured approach to evaluate potential solutions based on their impact, feasibility, and cost:"
  - table:
    - rowgroup:
      - row "Potential Solution Impact (1-10) Feasibility (1-10) Cost (10=low) Timeline (10=quick) Total Score Decision":
        - cell "Potential Solution"
        - cell "Impact (1-10)"
        - cell "Feasibility (1-10)"
        - cell "Cost (10=low)"
        - cell "Timeline (10=quick)"
        - cell "Total Score"
        - cell "Decision"
    - rowgroup:
      - row "Scanner Calibration Protocol 9 8 7 9 33 Implement":
        - cell "Scanner Calibration Protocol"
        - cell "9"
        - cell "8"
        - cell "7"
        - cell "9"
        - cell "33"
        - cell "Implement"
      - row "WiFi Network Enhancement 8 7 5 6 26 Implement":
        - cell "WiFi Network Enhancement"
        - cell "8"
        - cell "7"
        - cell "5"
        - cell "6"
        - cell "26"
        - cell "Implement"
      - row "Standardized Training Program 8 9 6 5 28 Implement":
        - cell "Standardized Training Program"
        - cell "8"
        - cell "9"
        - cell "6"
        - cell "5"
        - cell "28"
        - cell "Implement"
      - row "Cycle Counting Redesign 7 8 9 7 31 Implement":
        - cell "Cycle Counting Redesign"
        - cell "7"
        - cell "8"
        - cell "9"
        - cell "7"
        - cell "31"
        - cell "Implement"
      - row "Special Handling Protocol 7 9 8 8 32 Implement":
        - cell "Special Handling Protocol"
        - cell "7"
        - cell "9"
        - cell "8"
        - cell "8"
        - cell "32"
        - cell "Implement"
      - row "Error-Proofing Checklists 6 9 9 8 32 Implement":
        - cell "Error-Proofing Checklists"
        - cell "6"
        - cell "9"
        - cell "9"
        - cell "8"
        - cell "32"
        - cell "Implement"
      - row "Full WMS System Replacement 10 3 1 2 16 Reject":
        - cell "Full WMS System Replacement"
        - cell "10"
        - cell "3"
        - cell "1"
        - cell "2"
        - cell "16"
        - cell "Reject"
      - row "Full Inventory Outsourcing 6 4 2 4 16 Reject":
        - cell "Full Inventory Outsourcing"
        - cell "6"
        - cell "4"
        - cell "2"
        - cell "4"
        - cell "16"
        - cell "Reject"
      - row "Barcode to RFID Conversion 9 5 3 4 21 Future":
        - cell "Barcode to RFID Conversion"
        - cell "9"
        - cell "5"
        - cell "3"
        - cell "4"
        - cell "21"
        - cell "Future"
  - paragraph: Based on this evaluation, we selected six key improvements for implementation, with a comprehensive RFID conversion planned as a future initiative after the current improvements are stabilized.
  - heading "Improvement Solutions" [level=3]
  - text: 
  - heading "Scanner Calibration Protocol" [level=4]
  - paragraph: Implemented a daily automated scanner calibration check and maintenance schedule, reducing scanner-related errors by 85%.
  - text: 
  - heading "WiFi Network Enhancement" [level=4]
  - paragraph: Installed additional access points and signal boosters in warehouse areas with weak coverage, eliminating connectivity-related data loss.
  - text: 
  - heading "Standardized Training Program" [level=4]
  - paragraph: Developed a competency-based training program with hands-on practice sessions and knowledge verification checkpoints.
  - text: 
  - heading "Cycle Counting Redesign" [level=4]
  - paragraph: Replaced large end-of-month counts with daily cycle counting of smaller sections, distributing workload more evenly.
  - text: 
  - heading "Special Handling Protocol" [level=4]
  - paragraph: Created special handling procedures for small, high-value items with double verification and secure storage.
  - text: 
  - heading "Error-Proofing Checklists" [level=4]
  - paragraph: Developed error-proofing checklists for critical inventory processes to prevent common mistakes.
  - heading "Implementation Approach" [level=3]
  - paragraph: "We used a phased implementation approach to minimize disruption while maximizing improvement impact:"
  - 'heading "Phase 1: Pilot (2 weeks)" [level=4]'
  - list:
    - listitem: Implemented solutions in one warehouse section
    - listitem: Gathered feedback and refined approaches
    - listitem: Validated results with statistical analysis
  - 'heading "Phase 2: Roll-Out (8 weeks)" [level=4]'
  - list:
    - listitem: Sequential implementation across all warehouse sections
    - listitem: Staff training on new procedures and technologies
    - listitem: Daily monitoring of key metrics during transition
  - 'heading "Phase 3: Stabilization (4 weeks)" [level=4]'
  - list:
    - listitem: Fine-tuning of processes based on implementation learnings
    - listitem: Standardization of procedures and documentation
    - listitem: Transition to sustaining control measures
  - heading "RFID Implementation Design" [level=3]
  - paragraph: "While full RFID conversion was identified as a future initiative, we did implement targeted RFID technology for high-value pharmaceuticals:"
  - heading "Pilot RFID Implementation" [level=4]
  - paragraph: "A targeted RFID implementation was designed for the high-value pharmaceutical storage area, which had shown the highest discrepancy rates in our analysis:"
  - list:
    - listitem:
      - strong: "Scope:"
      - text: 1,200 high-value pharmaceutical SKUs in three secured storage locations
    - listitem:
      - strong: "Hardware:"
      - text: Zebra FX9600 fixed RFID readers at entry/exit points and 3 handheld RFID readers
    - listitem:
      - strong: "Tags:"
      - text: UHF RFID tags with pharmaceutical-grade adhesives compliant with regulatory requirements
    - listitem:
      - strong: "Integration:"
      - text: Middleware layer connecting RFID data capture with the existing WMS
    - listitem:
      - strong: "Data Flow:"
      - text: Real-time inventory updates, automated threshold alerts, and historical movement tracking
  - heading "RFID System Architecture" [level=4]
  - img "RFID System Architecture"
  - paragraph: RFID system architecture showing the data flow from RFID tags through readers to the middleware and WMS integration
  - heading "RFID Implementation Benefits" [level=4]
  - list:
    - listitem:
      - strong: "Inventory Visibility:"
      - text: Real-time tracking of high-value inventory movement
    - listitem:
      - strong: "Accuracy:"
      - text: 99.8% read accuracy compared to 94% with barcode scanning
    - listitem:
      - strong: "Efficiency:"
      - text: 73% reduction in time required for inventory counts in the pilot area
    - listitem:
      - strong: "Security:"
      - text: Automated alerting for unauthorized movement of tagged items
    - listitem:
      - strong: "Analytics:"
      - text: Enhanced data collection for movement patterns and dwell times
  - heading "5S Implementation" [level=3]
  - paragraph: "We implemented the 5S methodology (Sort, Set in order, Shine, Standardize, Sustain) to improve workplace organization and efficiency:"
  - text: 
  - heading "1. Sort" [level=4]
  - paragraph:
    - strong: "Actions:"
  - list:
    - listitem: Conducted inventory of all tools, equipment, and supplies
    - listitem: Removed unused or expired items from warehouse areas
    - listitem: Implemented red-tag system for items of questionable value
  - paragraph:
    - strong: "Outcome:"
    - text: Removed 345 unnecessary items from the work area, freeing up 18% more space
  - text: 
  - heading "2. Set in Order" [level=4]
  - paragraph:
    - strong: "Actions:"
  - list:
    - listitem: Reorganized inventory based on usage frequency and relationships
    - listitem: Implemented visual management with floor markings and labels
    - listitem: Created shadow boards for equipment and tool organization
  - paragraph:
    - strong: "Outcome:"
    - text: Reduced motion waste by 30% through optimized layout
  - text: 
  - heading "3. Shine" [level=4]
  - paragraph:
    - strong: "Actions:"
  - list:
    - listitem: Developed daily cleaning schedules for all work areas
    - listitem: Created maintenance checklists for scanners and equipment
    - listitem: Established inspection procedures to identify issues early
  - paragraph:
    - strong: "Outcome:"
    - text: 62% reduction in scanner-related issues through regular maintenance
  - text: 
  - heading "4. Standardize" [level=4]
  - paragraph:
    - strong: "Actions:"
  - list:
    - listitem: Created visual standard operating procedures for common tasks
    - listitem: Implemented color-coding system for inventory categories
    - listitem: Developed standardized workstation layouts
  - paragraph:
    - strong: "Outcome:"
    - text: 25% improvement in process adherence through visual standards
  - text: 
  - heading "5. Sustain" [level=4]
  - paragraph:
    - strong: "Actions:"
  - list:
    - listitem: Implemented weekly 5S audits with scoring system
    - listitem: Created visual management boards to track 5S performance
    - listitem: Established recognition program for 5S champions
  - paragraph:
    - strong: "Outcome:"
    - text: Maintained 90%+ compliance with 5S standards over six months
  - heading "5S Implementation Results" [level=4]
  - paragraph: "The 5S implementation yielded significant benefits across multiple dimensions:"
  - text: 28% Reduction in Motion Waste 62% Fewer Equipment Issues 18% Space Utilization Improvement 22% Time Saved in Inventory Activities
  - heading "Interactive 5S Digital Organization System" [level=3]
  - paragraph: "To help implement and maintain the 5S methodology, we developed a digital tool that supports staff in their daily organization activities:"
  - link " 5S Digital Organization System":
    - /url: "#"
  - iframe
  - paragraph: This interactive 5S Digital Organization System demonstrates how technology enhances workplace organization through digital audits, computer vision for shelf scanning, and gamification for staff engagement. The simulation shows how staff can use these digital tools for real-time issue identification and compliance verification.
  - heading "Digital Kanban Implementation" [level=3]
  - paragraph: "Our RFID implementation was enhanced with a digital Kanban system that automates inventory replenishment triggers based on real-time consumption:"
  - link " Digital Kanban System":
    - /url: "#"
  - iframe
  - paragraph: The Digital Kanban System creates a pull-based approach to inventory management, where replenishment is triggered automatically based on actual usage. This simulation demonstrates how the system connects shop floor inventory with warehouse supply, eliminating the manual visual checks previously required and reducing wait times from 5 hours to just 18 minutes.
  - heading "Pilot Implementation Results" [level=3]
  - paragraph: "We conducted a three-week pilot implementation of these improvements in one warehouse section. The results showed:"
  - list:
    - listitem: Reduction in inventory discrepancies from 18% to 3.5%
    - listitem: Process cycle time reduced by 42%
    - listitem: Staff satisfaction with the inventory process improved by 67%
    - listitem: Process sigma level improved from 2.4 to 3.9
  - paragraph: Based on these positive results, the improvements were rolled out to all warehouse areas. The full implementation plan included detailed training materials, standardized work instructions, and a phased roll-out schedule to minimize disruption.
- contentinfo:
  - paragraph: © 2025 Lean Six Sigma Project. All rights reserved.
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('5S and Kanban integration test', async ({ page }) => {
   4 |   // Navigate to the improve page
   5 |   await page.goto('file:///c:/Users/anteb/OneDrive/Desktop/Griffith/Lean Six Sigma/assignment/My version/lean_six_sigma/build/improve/index.html');
   6 |   
   7 |   // 1. Test the 5S App integration
   8 |   console.log('Testing 5S App integration...');
   9 |   
  10 |   // Find and click the 5S App link
  11 |   const fiveSLink = page.locator('text=5S Digital Organization System');
> 12 |   await expect(fiveSLink).toBeVisible();
     |                           ^ Error: expect.toBeVisible: Error: strict mode violation: locator('text=5S Digital Organization System') resolved to 3 elements:
  13 |   await fiveSLink.click();
  14 |   
  15 |   // Check if the iframe container becomes visible
  16 |   const fiveSIframeContainer = page.locator('#5s-app-iframe-container');
  17 |   await expect(fiveSIframeContainer).toBeVisible();
  18 |   
  19 |   // Get the iframe element
  20 |   const fiveSIframe = fiveSIframeContainer.locator('iframe');
  21 |   await expect(fiveSIframe).toBeVisible();
  22 |   
  23 |   // Take a screenshot of the 5S app
  24 |   await page.screenshot({ path: 'test-results/5s-app-integration.png' });
  25 |   
  26 |   // Click the link again to collapse the iframe
  27 |   await fiveSLink.click();
  28 |   await expect(fiveSIframeContainer).not.toBeVisible();
  29 |   
  30 |   // 2. Test the Kanban System integration
  31 |   console.log('Testing Kanban System integration...');
  32 |   
  33 |   // Find and click the Kanban System link
  34 |   const kanbanLink = page.locator('text=Digital Kanban System');
  35 |   await expect(kanbanLink).toBeVisible();
  36 |   await kanbanLink.click();
  37 |   
  38 |   // Check if the iframe container becomes visible
  39 |   const kanbanIframeContainer = page.locator('#kanban-iframe-container');
  40 |   await expect(kanbanIframeContainer).toBeVisible();
  41 |   
  42 |   // Get the iframe element
  43 |   const kanbanIframe = kanbanIframeContainer.locator('iframe');
  44 |   await expect(kanbanIframe).toBeVisible();
  45 |   
  46 |   // Take a screenshot of the Kanban system
  47 |   await page.screenshot({ path: 'test-results/kanban-system-integration.png' });
  48 |   
  49 |   // Click the link again to collapse the iframe
  50 |   await kanbanLink.click();
  51 |   await expect(kanbanIframeContainer).not.toBeVisible();
  52 |   
  53 |   console.log('Integration test completed successfully!');
  54 | });
```