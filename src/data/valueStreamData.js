export const valueStreamData = {
  suppliers: [
    {
      id: "supplier-meddev",
      name: "MedDev",
      productType: "Medical Device",
      deliverySchedule: "Daily (working days)",
      leadTime: 2, // days
      position: {x: 50, y: 100},
      details: "Medical device supplier with daily deliveries and 2-day lead time."
    },
    {
      id: "supplier-drugseek",
      name: "DrugSeek",
      productType: "Drugs",
      deliverySchedule: "3 times per week (Mon, Wed, Fri)",
      leadTime: 3, // days
      position: {x: 50, y: 200},
      details: "Pharmaceutical supplier delivering 3 times weekly with 3-day lead time."
    },
    {
      id: "supplier-vitafast",
      name: "VitaFast",
      productType: "Miscellaneous",
      deliverySchedule: "2 times per week (Tue, Thu)",
      leadTime: 4, // days
      position: {x: 50, y: 300},
      details: "Supplier for miscellaneous goods delivering twice weekly with 4-day lead time."
    }
  ],
  
  processes: [
    {
      id: "process-receiving",
      name: "Receiving Process",
      cycleTime: 38, // minutes
      valueAddedTime: 25, // minutes
      nonValueAddedTime: 13, // minutes
      staff: 2.5, // average number
      position: {x: 200, y: 200},
      nextProcesses: ["inventory-medical", "inventory-drugs-misc"],
      details: "Inward goods processing takes 30-45 minutes per delivery. Staff count: 2-3 warehouse team members.",
      steps: [
        { name: "Count received stock", time: 15, accuracy: 94 },
        { name: "Verify against delivery docs", time: 10 },
        { name: "Update Omega ERP", time: 5 }
      ]
    },
    {
      id: "process-internal-dist-medical",
      name: "Medical Devices Distribution",
      cycleTime: 41, // minutes
      valueAddedTime: 22, // minutes
      nonValueAddedTime: 19, // minutes
      staff: 2, 
      position: {x: 350, y: 100},
      nextProcesses: ["inventory-shop-storage-medical"],
      details: "Distribution of medical devices involves checking, picking, ERP transactions, and transport.",
      steps: [
        { name: "Check storage (twice daily)", time: 0, frequency: "9 AM, 2 PM" },
        { name: "Pick from main warehouse", time: 22 },
        { name: "ERP transaction", time: 7 },
        { name: "Transport to shop storage", time: 12 }
      ]
    },
    {
      id: "process-internal-dist-drugs",
      name: "Drugs & Misc Distribution",
      cycleTime: 25, // minutes
      valueAddedTime: 18, // minutes
      nonValueAddedTime: 7, // minutes
      staff: 2, 
      position: {x: 350, y: 300},
      nextProcesses: ["inventory-shop-storage-drugs", "inventory-shop-storage-misc"],
      details: "Distribution of drugs and miscellaneous items involves checking, picking, and transport.",
      steps: [
        { name: "Check storage (twice daily)", time: 0, frequency: "10 AM, 3 PM" },
        { name: "Pick from ground floor warehouse", time: 18 },
        { name: "Transport to shop storage", time: 7 }
      ]
    },
    {
      id: "process-sales",
      name: "Sales Process",
      cycleTime: 12.2, // minutes (avg)
      valueAddedTime: 4.2, // minutes
      nonValueAddedTime: 8, // minutes
      staff: 5, // variable
      position: {x: 650, y: 200},
      nextProcesses: ["customer"],
      details: "Sales process includes shelf stocking and customer service with different timelines for different products.",
      steps: [
        { name: "Shelf stocking from storage", time: 8, frequency: "Multiple times daily" },
        { name: "Customer transaction", time: 4.2, range: "3-5 min standard, 10-15 min for complex items" },
        { name: "Customer wait time", time: 4.8, range: "2-8 min" }
      ]
    },
    {
      id: "process-stock-take",
      name: "Stock Take Process",
      cycleTime: 489, // minutes (8.15 hours)
      valueAddedTime: 150, // minutes (approx)
      nonValueAddedTime: 339, // minutes
      staff: 18, // all staff
      position: {x: 500, y: 400},
      details: "Quarterly stock take process involves shop closure, manual counting, scanning, and reconciliation.",
      steps: [
        { name: "Preparation phase", time: 120, impact: "4 hours lost sales time, €3,200 revenue impact" },
        { name: "Manual counting phase", time: 150, accuracy: 76.5 },
        { name: "Lunch break", time: 60 },
        { name: "Scanning phase", time: 162, scanners: 6, utilization: 67 },
        { name: "Wait time during uploads", time: 45 },
        { name: "Verification phase", time: 38 },
        { name: "Recount problem areas", time: 84, problemRate: 8.5 },
        { name: "Final reconciliation", time: 42 }
      ]
    }
  ],
  
  inventoryPoints: [
    {
      id: "inventory-medical",
      name: "Main Warehouse (Medical)",
      averageQuantity: 1520,
      storageTime: 48, // hours
      position: {x: 250, y: 100},
      details: "Inventory of medical devices stored in main warehouse building (3rd floor)."
    },
    {
      id: "inventory-drugs-misc",
      name: "Shop Building Warehouse",
      averageQuantity: 3450,
      storageTime: 48, // hours
      position: {x: 250, y: 300},
      details: "Inventory of drugs and miscellaneous goods stored in shop building ground floor."
    },
    {
      id: "inventory-shop-storage-medical",
      name: "Shop Storage (Medical)",
      averageQuantity: 210,
      storageTime: 24, // hours
      position: {x: 500, y: 100},
      details: "Medical devices storage room within the shop."
    },
    {
      id: "inventory-shop-storage-drugs",
      name: "Shop Storage (Drugs)",
      averageQuantity: 450,
      storageTime: 24, // hours
      position: {x: 500, y: 250},
      details: "Drugs storage room within the shop."
    },
    {
      id: "inventory-shop-storage-misc",
      name: "Shop Storage (Misc)",
      averageQuantity: 180,
      storageTime: 24, // hours
      position: {x: 500, y: 350},
      details: "Miscellaneous items storage room within the shop."
    }
  ],
  
  informationFlows: [
    {
      id: "info-orders",
      name: "Order Information",
      from: "process-operation-manager",
      to: "supplier-all",
      type: "electronic", // electronic, manual, or visual
      medium: "ERP Omega",
      frequency: "As needed",
      position: {x: 150, y: 50},
      details: "Orders transmitted via ERP Omega system. Processing time: 45 minutes, Order accuracy: 92%"
    },
    {
      id: "info-warehouse-check-medical",
      name: "Storage Check (Medical)",
      from: "inventory-shop-storage-medical",
      to: "process-internal-dist-medical",
      type: "manual",
      frequency: "Twice daily (9 AM, 2 PM)",
      position: {x: 400, y: 150},
      details: "Manual check of storage rooms to determine needed items."
    },
    {
      id: "info-warehouse-check-drugs",
      name: "Storage Check (Drugs/Misc)",
      from: "inventory-shop-storage-drugs",
      to: "process-internal-dist-drugs",
      type: "manual",
      frequency: "Twice daily (10 AM, 3 PM)",
      position: {x: 400, y: 250},
      details: "Manual check of storage rooms to determine needed items."
    },
    {
      id: "info-shelf-check",
      name: "Shelf Check",
      from: "process-sales",
      to: "inventory-shop-storage-medical",
      type: "visual",
      frequency: "Multiple times daily",
      position: {x: 575, y: 175},
      details: "Visual check of shelf inventory to determine restocking needs. No formal ERP transaction."
    }
  ],
  
  materialFlows: [
    {
      id: "material-meddev",
      from: "supplier-meddev",
      to: "process-receiving",
      type: "push", // push or pull
      transportMethod: "Truck",
      details: "Medical devices delivered daily by truck."
    },
    {
      id: "material-drugseek",
      from: "supplier-drugseek",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck",
      details: "Pharmaceutical products delivered 3 times weekly by truck."
    },
    {
      id: "material-vitafast",
      from: "supplier-vitafast",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck",
      details: "Miscellaneous goods delivered twice weekly by truck."
    },
    {
      id: "material-receiving-medical",
      from: "process-receiving",
      to: "inventory-medical",
      type: "push",
      details: "Medical devices moved to main warehouse after receiving."
    },
    {
      id: "material-receiving-drugs",
      from: "process-receiving",
      to: "inventory-drugs-misc",
      type: "push",
      details: "Drugs and miscellaneous items moved to shop building warehouse after receiving."
    },
    {
      id: "material-dist-medical",
      from: "inventory-medical",
      to: "process-internal-dist-medical",
      type: "pull",
      details: "Medical devices pulled based on twice-daily checks."
    },
    {
      id: "material-dist-drugs",
      from: "inventory-drugs-misc",
      to: "process-internal-dist-drugs",
      type: "pull",
      details: "Drugs and miscellaneous items pulled based on twice-daily checks."
    },
    {
      id: "material-dist-to-storage-medical",
      from: "process-internal-dist-medical",
      to: "inventory-shop-storage-medical",
      type: "push",
      details: "Medical devices moved to shop storage rooms."
    },
    {
      id: "material-dist-to-storage-drugs",
      from: "process-internal-dist-drugs",
      to: "inventory-shop-storage-drugs",
      type: "push",
      details: "Drugs moved to shop storage rooms."
    },
    {
      id: "material-dist-to-storage-misc",
      from: "process-internal-dist-drugs",
      to: "inventory-shop-storage-misc",
      type: "push",
      details: "Miscellaneous items moved to shop storage rooms."
    },
    {
      id: "material-storage-to-sales-medical",
      from: "inventory-shop-storage-medical",
      to: "process-sales",
      type: "pull",
      details: "Medical devices pulled to shop floor based on visual checks."
    },
    {
      id: "material-storage-to-sales-drugs",
      from: "inventory-shop-storage-drugs",
      to: "process-sales",
      type: "pull",
      details: "Drugs pulled to shop floor based on visual checks."
    },
    {
      id: "material-storage-to-sales-misc",
      from: "inventory-shop-storage-misc",
      to: "process-sales",
      type: "pull",
      details: "Miscellaneous items pulled to shop floor based on visual checks."
    }
  ],
  
  customer: {
    id: "customer",
    name: "Customers",
    satisfaction: 86, // percentage
    position: {x: 800, y: 200},
    details: "End customers with 86% satisfaction rate."
  },
  
  metrics: {
    totalLeadTime: 10.5, // days
    valueAddedTime: 1.8, // days
    nonValueAddedNecessaryTime: 2.4, // days
    pureWasteTime: 6.3, // days
    valueAddedPercentage: 17.1,
    inventoryAccuracy: 76.5,
    stockTakeImpact: {
      lostTimeHours: 4,
      resourceHours: 147,
      revenueImpact: 3200 // Euros
    },
    countMethodEffectiveness: {
      scannerCount: 85.1, // percentage accuracy
      manualCount: 62.2, // percentage accuracy
      combinedMethod: 62.4 // percentage accuracy
    },
    staffTrainingImpact: {
      advancedTraining: 87.3, // percentage accuracy
      intermediateTraining: 77.4, // percentage accuracy
      basicTraining: 65.3 // percentage accuracy
    },
    averageCountTime: 1137.62, // seconds
    staffUtilization: 82 // percentage
  },
  
  improvementOpportunities: [
    {
      id: "improvement-rfid",
      name: "RFID Implementation",
      description: "Implement RFID technology for real-time inventory tracking",
      impactAreas: ["Inventory accuracy", "Count time", "Labor utilization"],
      estimatedImpact: {
        inventoryAccuracy: 95, // percentage
        leadTimeReduction: 2.3, // days
        laborSavings: 95 // hours per quarter
      },
      position: {x: 400, y: 350}
    },
    {
      id: "improvement-training",
      name: "Enhanced Staff Training",
      description: "Standardized training program for all inventory staff",
      impactAreas: ["Count accuracy", "Process time", "Error reduction"],
      estimatedImpact: {
        countAccuracy: 90, // percentage
        processTimeReduction: 15, // percentage
        errorReduction: 60 // percentage
      },
      position: {x: 300, y: 150}
    },
    {
      id: "improvement-scanner",
      name: "Scanner Optimization",
      description: "Upgrade all scanners and implement standard scanning protocols",
      impactAreas: ["Scan time", "Data accuracy", "Battery issues"],
      estimatedImpact: {
        scanTimeReduction: 30, // percentage
        dataAccuracy: 93, // percentage
        batteryIssueReduction: 85 // percentage
      },
      position: {x: 600, y: 300}
    }
  ]
};
