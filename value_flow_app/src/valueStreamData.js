export const valueStreamData = {
  suppliers: [
    {
      id: "supplier-meddev",
      name: "MedDev",
      productType: "Medical devices",
      deliveryFrequency: "Daily (working days)",
      leadTime: "1-2 days",
      processTime: 0.5, // days
      position: {x: 50, y: 150},
      details: "Supplies medical devices with next-day delivery capability"
    },
    {
      id: "supplier-drugseek",
      name: "DrugSeek",
      productType: "Pharmaceutical drugs",
      deliveryFrequency: "3 times/week",
      leadTime: "1 day",
      processTime: 0.3, // days
      position: {x: 50, y: 250},
      details: "Pharmaceutical supplier with consistent delivery schedule"
    },
    {
      id: "supplier-vitafast",
      name: "VitaFast",
      productType: "Miscellaneous goods",
      deliveryFrequency: "2 times/week",
      leadTime: "1-3 days",
      processTime: 0.4, // days
      position: {x: 50, y: 350},
      details: "Supplies miscellaneous healthcare products"
    }
  ],
  
  processes: [
    {
      id: "process-receiving",
      name: "Receiving",
      processTimes: {
        medicalDevices: 1.5, // hours
        drugs: 1.2, // hours
        miscellaneous: 0.8, // hours
      },
      waitTime: {
        min: 2, // hours
        max: 4 // hours
      },
      cycleTime: {
        min: 3, // hours
        max: 6 // hours
      },
      resources: {
        staff: {
          min: 2,
          max: 3
        },
        equipment: ["Pallet trucks", "Trolleys"]
      },
      valueAddedRatio: 40, // percentage
      position: {x: 250, y: 250},
      details: "Receiving process involves manual verification of incoming goods against delivery documents"
    },
    {
      id: "process-storage",
      name: "Storage",
      processTimes: {
        medicalDevices: 0.8, // hours
        drugs: 0.6, // hours
      },
      waitTime: {
        medicalDevices: {
          min: 2, // days
          max: 5 // days
        },
        drugs: {
          min: 1, // days
          max: 3 // days
        },
        miscellaneous: {
          min: 3, // days
          max: 7 // days
        }
      },
      valueAddedRatio: 15, // percentage
      position: {x: 450, y: 250},
      details: "Storage in two locations: medical devices in main warehouse (3rd floor), drugs and miscellaneous in shop building (ground floor)"
    }
  ],
  
  inventoryPoints: [
    {
      id: "inventory-medicalDevices",
      name: "Medical Devices Warehouse",
      location: "Main Building (3rd Floor)",
      averageQuantity: 2500,
      storageCapacityUtilization: 78, // percentage
      stockoutRate: 5.2, // percentage
      position: {x: 350, y: 150},
      details: "Main storage location for medical devices"
    },
    {
      id: "inventory-drugsAndMisc",
      name: "Drugs & Miscellaneous Warehouse",
      location: "Shop Building (Ground Floor)",
      averageQuantity: 3800,
      storageCapacityUtilization: 78, // percentage
      stockoutRate: 5.2, // percentage
      position: {x: 350, y: 350},
      details: "Primary storage for pharmaceutical and miscellaneous products"
    },
    {
      id: "inventory-shopFloor",
      name: "Shop Floor Storage",
      location: "Shop Building (1st Floor)",
      averageQuantity: 1200,
      storageCapacityUtilization: 65, // percentage
      position: {x: 550, y: 250},
      details: "Shop floor inventory with two separate storage rooms"
    }
  ],
  
  informationFlows: [
    {
      id: "info-ordersMedDev",
      name: "Orders to MedDev",
      from: "process-erp", 
      to: "supplier-meddev",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "Daily",
      details: "Electronic orders for medical devices sent through shared ERP"
    },
    {
      id: "info-ordersDrugSeek",
      name: "Orders to DrugSeek",
      from: "process-erp", 
      to: "supplier-drugseek",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "3 times/week",
      details: "Electronic orders for pharmaceutical products"
    },
    {
      id: "info-ordersVitaFast",
      name: "Orders to VitaFast",
      from: "process-erp", 
      to: "supplier-vitafast",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "2 times/week",
      details: "Electronic orders for miscellaneous goods"
    },
    {
      id: "info-inventoryUpdates",
      name: "Inventory Updates",
      from: "process-receiving", 
      to: "process-erp",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "Real-time",
      details: "Updates to inventory levels after receiving and verification"
    },
    {
      id: "info-storageTransfers",
      name: "Storage Transfer Records",
      from: "process-storage", 
      to: "process-erp",
      type: "electronic",
      medium: "Omega ERP System",
      frequency: "As needed",
      details: "Records of transfers between warehouse and shop floor"
    }
  ],
  
  materialFlows: [
    {
      id: "material-meddev",
      from: "supplier-meddev",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck, then Trolley",
      frequency: "Daily",
      details: "Medical devices delivered by truck, then transferred to trolleys for transport to main warehouse"
    },
    {
      id: "material-drugseek",
      from: "supplier-drugseek",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck, then Pallet Truck",
      frequency: "3 times/week",
      details: "Pharmaceutical products delivered by truck, moved with pallet trucks to storage"
    },
    {
      id: "material-vitafast",
      from: "supplier-vitafast",
      to: "process-receiving",
      type: "push",
      transportMethod: "Truck, then Pallet Truck",
      frequency: "2 times/week",
      details: "Miscellaneous goods delivered by truck, moved with pallet trucks to storage"
    },
    {
      id: "material-warehouseToShop",
      from: "inventory-medicalDevices",
      to: "inventory-shopFloor",
      type: "pull",
      transportMethod: "Trolley",
      frequency: "At least twice daily",
      details: "Medical devices moved from main warehouse to shop storage as needed"
    },
    {
      id: "material-drugsToShop",
      from: "inventory-drugsAndMisc",
      to: "inventory-shopFloor",
      type: "pull",
      transportMethod: "Trolley",
      frequency: "At least twice daily",
      details: "Drugs and miscellaneous goods moved from ground floor warehouse to shop storage"
    }
  ],
  
  processes_erp: {
    id: "process-erp",
    name: "Order Processing",
    details: "Analysis of demand based on previous year's sales, online orders, and seasonal events",
    currentState: {
      processingTime: 2, // hours
      orderAccuracy: 92, // percentage
      communicationIssues: 15 // percentage requiring clarification
    },
    futureState: {
      forecast: {
        method: "AI-powered demand forecasting",
        accuracy: 95 // percentage
      },
      orderingSystem: "Automated",
      inventoryVisibility: "Real-time with RFID",
      supplierIntegration: "API",
      orderAccuracyTarget: 99 // percentage
    },
    position: {x: 150, y: 50}
  },
  
  customer: {
    id: "customer",
    name: "Pharmacy Customers",
    satisfaction: 86, // percentage
    position: {x: 650, y: 250},
    details: "End customers purchasing at the pharmacy shop floor"
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
      inventoryAccuracy: 76.5 // percentage
    },
    futureState: {
      processingTimeTarget: 0.8, // hours
      receivingAccuracyTarget: 99.5, // percentage
      inventoryTrackingMethod: "Real-time with location tracking",
      valueAddedPercentage: 35, // target percentage
      storageAccuracyTarget: 99, // percentage
      rfidImplementation: true,
      digitalProofOfDelivery: true,
      automatedVerification: true
    }
  }
};
