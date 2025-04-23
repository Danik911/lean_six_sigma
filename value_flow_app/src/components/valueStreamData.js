export const valueStreamData = {
  suppliers: [
    {
      id: "supplier-meddev",
      name: "MedDev",
      productType: "Medical devices",
      deliveryFrequency: "2 TIMES/WEEK",
      leadTime: "1-2 days",
      processTime: 0.5, // days
      position: {x: 430, y: 250}, // Top left section
      details: "Delivery to inward goods zone"
    },
    {
      id: "supplier-drugseek",
      name: "DrugSeek",
      productType: "Pharmaceutical drugs",
      deliveryFrequency: "3 TIMES/WEEK",
      leadTime: "1 day",
      processTime: 0.3, // days
      position: {x: 430, y: 450}, // Middle left section
      details: "Delivery to inward goods zone"
    },
    {
      id: "supplier-vitafast",
      name: "VitaFast",
      productType: "Miscellaneous goods",
      deliveryFrequency: "2 TIMES/WEEK",
      leadTime: "1-3 days",
      processTime: 0.4, // days
      position: {x: 430, y: 650}, // Bottom left section
      details: "Delivery to inward goods zone"
    }
  ],
  
  processes: [
    {
      id: "process-receiving",
      name: "Receiving",
      processTimes: {
        CT: 30, // mins
        CO: 15, // mins
      },
      FPY: 100, // percentage
      staff: 1,
      valueAddedRatio: 40, // percentage
      position: {x: 700, y: 450}, // Main flow row
      details: "Inward goods arrival"
    },
    {
      id: "process-check-dockets",
      name: "Check Dockets",
      processTimes: {
        CT: 20, // mins
        CO: 10, // mins
      },
      FPY: 100, // percentage
      staff: 1,
      valueAddedRatio: 20, // percentage
      position: {x: 850, y: 450}, // Main flow row
      details: "Verification of delivery"
    },
    {
      id: "process-main-warehouse",
      name: "Main Warehouse",
      processTimes: {
        CT: 45, // mins
        CO: 15, // mins
      },
      FPY: 100, // percentage
      staff: 2,
      valueAddedRatio: 15, // percentage
      position: {x: 1000, y: 450}, // Main flow row
      details: "Storing medical devices"
    },
    {
      id: "process-transfer-to-shop",
      name: "Transfer to Shop",
      processTimes: {
        CT: 25, // mins
        CO: 10, // mins
      },
      FPY: 100, // percentage
      staff: 1,
      valueAddedRatio: 15, // percentage
      position: {x: 1150, y: 450}, // Main flow row
      details: "Moving products to shop"
    },
    {
      id: "process-store-in-shop",
      name: "Store in Shop",
      processTimes: {
        CT: 20, // mins
        CO: 0, // N/A
      },
      FPY: 100, // percentage
      staff: 2,
      valueAddedRatio: 20, // percentage
      position: {x: 1300, y: 450}, // Main flow row
      details: "Placing on shelves"
    },
    {
      id: "process-sell-to-customer",
      name: "Sell to Customer",
      processTimes: {
        CT: 5, // mins per transaction (estimated)
        CO: 0, // N/A
      },
      FPY: 100, // percentage
      staff: 2,
      valueAddedRatio: 90, // percentage - high value added
      position: {x: 1450, y: 450}, // Main flow row
      details: "Sales process"
    },
    {
      id: "process-stock-control",
      name: "Stock Control",
      processTimes: {
        CT: 15, // mins
        CO: 0, // N/A
      },
      FPY: 100, // percentage
      staff: 1,
      valueAddedRatio: 30, // percentage
      position: {x: 1270, y: 250}, // Top row - based on screenshot
      details: "Monitoring inventory"
    },
    {
      id: "process-manual-count",
      name: "Manual Count",
      processTimes: {
        CT: 120, // mins
        CO: 60, // mins
      },
      FPY: 76.5, // percentage - from baseline data
      staff: 6,
      valueAddedRatio: 10, // percentage - low value
      position: {x: 1070, y: 250}, // Top row - based on screenshot
      details: "Stock-take counting"
    },
    {
      id: "process-scanning",
      name: "Scanning",
      processTimes: {
        CT: 90, // mins
        CO: 5, // mins
      },
      FPY: 85, // percentage - approximate
      staff: 6,
      valueAddedRatio: 15, // percentage
      position: {x: 870, y: 250}, // Top row - based on screenshot
      details: "Barcode scanning during stock-take"
    },
    {
      id: "process-dispatch",
      name: "Dispatch",
      processTimes: {
        CT: 15, // mins
        CO: 0, // N/A
      },
      FPY: 100, // percentage
      staff: 1,
      valueAddedRatio: 50, // percentage
      position: {x: 1600, y: 450}, // End of main flow row
      details: "Products leaving pharmacy"
    }
  ],
  
  inventoryPoints: [
    {
      id: "inventory-receiving",
      name: "Receiving Inventory",
      location: "Inward Goods Zone",
      averageQuantity: 500,
      storageCapacityUtilization: 70, // percentage
      stockoutRate: 0, // percentage
      position: {x: 600, y: 400}, // Between suppliers and receiving
      details: "Temporary storage at receiving area"
    },
    {
      id: "inventory-warehouse",
      name: "Main Warehouse Stock",
      location: "Main Warehouse",
      averageQuantity: 2500,
      storageCapacityUtilization: 78, // percentage
      stockoutRate: 5.2, // percentage
      position: {x: 925, y: 550}, // Below main warehouse - based on screenshot
      details: "Main storage location for inventory"
    },
    {
      id: "inventory-shop",
      name: "Shop Floor Stock",
      location: "Shop Building",
      averageQuantity: 1200,
      storageCapacityUtilization: 65, // percentage
      position: {x: 1225, y: 550}, // Below store in shop - based on screenshot
      details: "Products on display or in shop storage"
    }
  ],
  
  informationFlows: [
    {
      id: "info-ordering",
      name: "Order Placement",
      from: "process-erp", 
      to: "supplier-meddev",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "2 times/week",
      details: "Orders based on previous year sales, online orders, and periodic events"
    },
    {
      id: "info-drugseek-orders",
      name: "DrugSeek Orders",
      from: "process-erp", 
      to: "supplier-drugseek",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "3 times/week",
      details: "Orders based on previous year sales, online orders, and periodic events"
    },
    {
      id: "info-vitafast-orders",
      name: "VitaFast Orders",
      from: "process-erp", 
      to: "supplier-vitafast",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "2 times/week",
      details: "Orders based on previous year sales, online orders, and periodic events"
    },
    {
      id: "info-inventory-updates",
      name: "Inventory Updates",
      from: "process-receiving", 
      to: "process-erp",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "Real-time",
      details: "Updates to inventory levels after receiving and verification"
    },
    {
      id: "info-warehouse-to-shop",
      name: "Stock Requests",
      from: "process-store-in-shop", 
      to: "process-main-warehouse",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "At least twice daily",
      details: "Requests from shop to warehouse for product replenishment"
    },
    {
      id: "info-stock-control",
      name: "Stock Level Monitoring",
      from: "process-stock-control", 
      to: "process-erp",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "Twice daily",
      details: "Regular stock level checks and updates"
    },
    {
      id: "info-stocktake-results",
      name: "Stock-take Results",
      from: "process-scanning", 
      to: "process-erp",
      type: "electronic",
      medium: "Scanner Upload",
      frequency: "Quarterly",
      details: "Stock-take count results uploaded to ERP system"
    }
  ],
  
  materialFlows: [
    {
      id: "material-meddev",
      from: "supplier-meddev",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck delivery",
      frequency: "2 times/week",
      details: "Medical devices delivered to inward goods zone"
    },
    {
      id: "material-drugseek",
      from: "supplier-drugseek",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck delivery",
      frequency: "3 times/week",
      details: "Pharmaceutical products delivered to inward goods zone"
    },
    {
      id: "material-vitafast",
      from: "supplier-vitafast",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck delivery",
      frequency: "2 times/week",
      details: "Miscellaneous goods delivered to inward goods zone"
    },
    {
      id: "material-receiving-to-check",
      from: "process-receiving",
      to: "process-check-dockets",
      type: "push",
      transportMethod: "Manual transfer",
      frequency: "As deliveries arrive",
      details: "Products moved for verification against delivery documents"
    },
    {
      id: "material-check-to-warehouse",
      from: "process-check-dockets",
      to: "process-main-warehouse",
      type: "push",
      transportMethod: "Trolley, Pallet Jack",
      frequency: "After verification",
      details: "Verified products moved to main warehouse for storage"
    },
    {
      id: "material-warehouse-to-transfer",
      from: "process-main-warehouse",
      to: "process-transfer-to-shop",
      type: "pull",
      transportMethod: "Trolley",
      frequency: "At least twice daily",
      details: "Products pulled from warehouse based on shop requests"
    },
    {
      id: "material-transfer-to-store",
      from: "process-transfer-to-shop",
      to: "process-store-in-shop",
      type: "push",
      transportMethod: "Trolley",
      frequency: "At least twice daily",
      details: "Products moved to shop for placement on shelves"
    },
    {
      id: "material-store-to-sell",
      from: "process-store-in-shop",
      to: "process-sell-to-customer",
      type: "pull",
      transportMethod: "Manual selection",
      frequency: "Continuous during business hours",
      details: "Products made available for customer purchase"
    },
    {
      id: "material-sell-to-dispatch",
      from: "process-sell-to-customer",
      to: "process-dispatch",
      type: "push",
      transportMethod: "Packaging",
      frequency: "After sales",
      details: "Products packaged for customer to take away"
    }
  ],
  
  processes_erp: {
    id: "process-erp",
    name: "Production Control",
    details: "Orders based on previous year sales, online orders, and periodic events",
    currentState: {
      processingTime: 2, // hours
      orderAccuracy: 92, // percentage
      communicationIssues: 15 // percentage requiring clarification
    },
    futureState: {
      totalLeadTime: 3.2, // days - reduced from current 5.5
      valueAddedTime: 1.1, // days - increased from current 0.8
      nonValueAddedNecessaryTime: 0.8, // days - reduced from current 1.4
      pureWasteTime: 1.3, // days - significantly reduced from current 3.3
      valueAddedPercentage: 35, // target percentage - up from 14.5%
      processingTimeTarget: 0.8, // hours
      receivingAccuracyTarget: 99.5, // percentage
      inventoryTrackingMethod: "Real-time with RFID",
      storageAccuracyTarget: 99, // percentage
      inventoryAccuracyTarget: 99, // percentage
      rfidImplementation: true,
      digitalProofOfDelivery: true,
      automatedVerification: true,
      
      // Future OEE/Utilization targets
      forecast: {
        method: "AI-powered demand forecasting",
        accuracy: 95 // percentage
      },
      orderingSystem: "Automated",
      inventoryVisibility: "Real-time with RFID",
      supplierIntegration: "API",
      orderAccuracyTarget: 99 // percentage
    },
    position: {x: 850, y: 120} // Top of the map - based on screenshot
  },
  
  customer: {
    id: "customer",
    name: "SimplePharma Customers",
    satisfaction: 86, // percentage
    position: {x: 1400, y: 350}, // Right side of map, above main flow
    details: "Medical devices and drugs, Various packaging, Daily average sales"
  },
  
  metrics: {
    currentState: {
      totalLeadTime: 5.5, // days
      valueAddedTime: 0.8, // days
      nonValueAddedNecessaryTime: 1.4, // days
      pureWasteTime: 3.3, // days
      valueAddedPercentage: 14.5,
      receivingAccuracy: 94, // percentage
      avgProcessingTimePerDelivery: 3.5, // hours
      manualCountingErrors: 6, // percentage
      documentationDiscrepancies: 8, // percentage
      resourceUtilization: 65, // percentage
      storageAccuracy: 76.5, // percentage
      inventoryAccuracy: 76.5, // percentage
      
      // OEE/Utilization for each process
      processOEE: {
        "receiving": 92, // percentage
        "check-dockets": 95, // percentage
        "main-warehouse": 88, // percentage
        "transfer-to-shop": 85, // percentage
        "store-in-shop": 82, // percentage
        "sell-to-customer": 93, // percentage
        "stock-control": 80, // percentage
        "manual-count": 62, // percentage
        "scanning": 75, // percentage
        "dispatch": 90 // percentage
      },
      
      // Non-value added activities
      nonValueActivities: [
        {
          id: "nva-search-time",
          description: "Staff search time for zones: 5 mins per group",
          affectedProcess: "manual-count",
          timeImpact: 30 // mins total
        },
        {
          id: "nva-upload-time",
          description: "Manual counting and scanner upload time: 5 mins per scanner",
          affectedProcess: "scanning",
          timeImpact: 30 // mins total
        },
        {
          id: "nva-recount-time",
          description: "Recounting due to inconsistencies: 60-90 mins per stock-take",
          affectedProcess: "manual-count",
          timeImpact: 75 // mins avg
        },
        {
          id: "nva-verification-time",
          description: "Data verification and corrections: 1-2 hours per stock-take",
          affectedProcess: "scanning",
          timeImpact: 90 // mins avg
        }
      ]
    },
    futureState: {
      processingTimeTarget: 0.8, // hours
      receivingAccuracyTarget: 99.5, // percentage
      inventoryTrackingMethod: "Real-time with RFID",
      valueAddedPercentage: 35, // target percentage
      storageAccuracyTarget: 99, // percentage
      inventoryAccuracyTarget: 99, // percentage
      rfidImplementation: true,
      digitalProofOfDelivery: true,
      automatedVerification: true,
      
      // Future OEE/Utilization targets
      processOEETargets: {
        "receiving": 98, // percentage
        "check-dockets": 99, // percentage
        "main-warehouse": 96, // percentage
        "transfer-to-shop": 97, // percentage
        "store-in-shop": 95, // percentage
        "sell-to-customer": 98, // percentage
        "stock-control": 99, // percentage
        "manual-count": 99, // percentage (mostly automated in future)
        "scanning": 99, // percentage (RFID replaces most scanning)
        "dispatch": 97 // percentage
      },
      
      // Problem areas and improvement opportunities
      improvementOpportunities: [
        {
          id: "improve-rfid",
          type: "technology",
          description: "RFID implementation for real-time inventory tracking",
          impactAreas: ["manual-count", "scanning", "stock-control"],
          expectedBenefit: "Eliminate quarterly stock-takes, improve accuracy by 22.5%"
        },
        {
          id: "improve-kanban",
          type: "kanban",
          description: "Implement Kanban system for inventory management",
          impactAreas: ["main-warehouse", "transfer-to-shop", "store-in-shop"],
          expectedBenefit: "Reduce stockouts by 80%, improve inventory turns"
        },
        {
          id: "improve-5s",
          type: "5S",
          description: "5S implementation in storage areas",
          impactAreas: ["main-warehouse", "store-in-shop"],
          expectedBenefit: "Reduce search time by 90%, improve space utilization by 20%"
        },
        {
          id: "improve-smed",
          type: "SMED",
          description: "Single-Minute Exchange of Die for reducing setup times",
          impactAreas: ["manual-count", "scanning"],
          expectedBenefit: "Reduce stock-take setup time by 75%"
        }
      ]
    }
  },
  
  // Problem areas (triangles on the map)
  problemAreas: [
    {
      id: "problem-manual-count",
      process: "process-manual-count",
      description: "Inefficient manual counting with sticky notes",
      position: {x: 580, y: 180} // Adjusted position
    },
    {
      id: "problem-scanning",
      process: "process-scanning",
      description: "Delays in scanning and data upload",
      position: {x: 480, y: 180} // Adjusted position
    },
    {
      id: "problem-info-flow",
      description: "Information flow between warehouse and shop",
      position: {x: 530, y: 380} // Adjusted position for better spacing
    },
    {
      id: "problem-stock-take",
      description: "Stock-take scheduling (quarterly closures)",
      position: {x: 530, y: 120} // Adjusted position
    }
  ],
  
  // Lean opportunities (symbols on the map)
  leanOpportunities: [
    {
      id: "lean-kanban",
      type: "kanban",
      description: "Kanban implementation opportunity",
      position: {x: 640, y: 450} // Adjusted position
    },
    {
      id: "lean-5s",
      type: "5s",
      description: "5S implementation opportunity",
      position: {x: 740, y: 500} // Adjusted position
    },
    {
      id: "lean-smed",
      type: "smed",
      description: "SMED opportunity for reducing setup times",
      position: {x: 420, y: 180} // Adjusted position
    },
    {
      id: "lean-automation",
      type: "automation",
      description: "RFID implementation opportunity",
      position: {x: 650, y: 180} // Adjusted position
    }
  ]
};
