export const valueStreamData = {
  suppliers: [
    { id: 'sup1', name: 'Raw Material Supplier', type: 'supplier', x: 50, y: 150 },
  ],
  processes: [
    { id: 'proc1', name: 'Receiving', type: 'process', x: 200, y: 150, cycleTime: 0.5, valueAddedTime: 0.1 },
    { id: 'proc2', name: 'Quality Check', type: 'process', x: 400, y: 150, cycleTime: 1, valueAddedTime: 0.2 },
    { id: 'proc3', name: 'Storage', type: 'process', x: 600, y: 150, cycleTime: 0.2, valueAddedTime: 0.05 },
    { id: 'proc4', name: 'Picking', type: 'process', x: 800, y: 150, cycleTime: 1.5, valueAddedTime: 0.3 },
    { id: 'proc5', name: 'Dispatch', type: 'process', x: 1000, y: 150, cycleTime: 0.8, valueAddedTime: 0.15 },
  ],
  inventoryPoints: [
    { id: 'inv1', name: 'Raw Materials', type: 'inventory', x: 125, y: 250, quantity: 100, leadTime: 2 },
    { id: 'inv2', name: 'WIP - QC', type: 'inventory', x: 300, y: 250, quantity: 50, leadTime: 1 },
    { id: 'inv3', name: 'WIP - Storage', type: 'inventory', x: 500, y: 250, quantity: 200, leadTime: 3 },
    { id: 'inv4', name: 'WIP - Picking', type: 'inventory', x: 700, y: 250, quantity: 75, leadTime: 1 },
    { id: 'inv5', name: 'Finished Goods', type: 'inventory', x: 900, y: 250, quantity: 150, leadTime: 2 },
  ],
  customers: [
     { id: 'cust1', name: 'End Customer', type: 'customer', x: 1150, y: 150 },
  ],
  // Basic flows (more detailed implementation needed for arrows/lines)
  materialFlows: [
    { from: 'sup1', to: 'proc1' },
    { from: 'proc1', to: 'inv2' }, // Example: Process to Inventory
    { from: 'inv2', to: 'proc2' }, // Example: Inventory to Process
    { from: 'proc2', to: 'inv3' },
    { from: 'inv3', to: 'proc3' },
    { from: 'proc3', to: 'inv4' },
    { from: 'inv4', to: 'proc4' },
    { from: 'proc4', to: 'inv5' },
    { from: 'inv5', to: 'proc5' },
    { from: 'proc5', to: 'cust1' },
  ],
  infoFlows: [
     // Define information flows if needed
  ],
  metrics: {
    totalLeadTime: 9, // Example value (sum of inventory lead times)
    valueAddedPercentage: 10, // Example value (sum VA time / total lead time)
    inventoryAccuracy: 76.5, // Baseline from report
    // Add other overall metrics
  },
};
