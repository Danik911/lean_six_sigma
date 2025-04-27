// Improvement icons and descriptions
const improvementIcons = {
  rfid: { icon: '📶', name: 'RFID Implementation', color: 'bg-purple-200 border-purple-500' },
  layout: { icon: '🔀', name: 'Layout Optimization', color: 'bg-blue-200 border-blue-500' },
  automation: { icon: '🤖', name: 'Automation', color: 'bg-green-200 border-green-500' },
  training: { icon: '👨‍🎓', name: 'Training Program', color: 'bg-yellow-200 border-yellow-500' },
  kaizen: { icon: '🔄', name: 'Kaizen Event', color: 'bg-red-200 border-red-500' },
  kanban: { icon: '🔢', name: 'Kanban System', color: 'bg-indigo-200 border-indigo-500' },
  pull: { icon: '⛓️', name: 'Pull System', color: 'bg-orange-200 border-orange-500' },
  sop: { icon: '📋', name: 'Standard Operating Procedure', color: 'bg-teal-200 border-teal-500' }
};

// Improvement data for each process node
const improvementsData = {
  'process-receiving': {
    improvements: [
      { type: 'rfid', data: 'RFID tagging at receiving for automated tracking' },
      { type: 'sop', data: 'Standardized receiving procedures with visual management' }
    ]
  },
  'process-storage': {
    improvements: [
      { type: 'layout', data: 'Reorganized storage layout by frequency of use' },
      { type: 'kanban', data: 'Implemented kanban system with visual indicators' }
    ]
  },
  'process-distribution': {
    improvements: [
      { type: 'pull', data: 'Implemented pull system based on shop floor demand' },
      { type: 'automation', data: 'Automated notification system for replenishment' }
    ]
  },
  'process-shopfloor': {
    improvements: [
      { type: 'rfid', data: 'RFID-enabled shelves for real-time inventory tracking' },
      { type: 'layout', data: 'Optimized product placement based on sales data' }
    ]
  },
  'process-stocktake': {
    improvements: [
      { type: 'rfid', data: 'RFID handheld scanners for accurate inventory counts' },
      { type: 'training', data: 'Enhanced staff training program with certification' },
      { type: 'kaizen', data: 'Conducted kaizen event to streamline process' }
    ]
  },
  'inventory-receiving': {
    improvements: [
      { type: 'pull', data: 'Reduced WIP with just-in-time processing' }
    ]
  },
  'inventory-storage': {
    improvements: [
      { type: 'kanban', data: 'Implemented kanban cards for inventory management' }
    ]
  },
  'inventory-transit': {
    improvements: [
      { type: 'layout', data: 'Optimized transit routes between locations' }
    ]
  }
};

// Future state changes (metrics and details for improved state)
const futureStateChanges = {
  'process-receiving': {
    metrics: { oeeUtilization: 95, accuracy: 97, processTime: 2.5 },
    details: 'Optimized receiving with RFID-enabled goods tracking'
  },
  'process-storage': {
    metrics: { oeeUtilization: 92, accuracy: 92.5, processTime: 0.5, waitTime: 48 },
    details: 'Reorganized storage with kanban system and visual management'
  },
  'process-distribution': {
    metrics: { oeeUtilization: 90, accuracy: 94, processTime: 0.8 },
    details: 'Pull-based distribution with automated notifications'
  },
  'process-shopfloor': {
    metrics: { oeeUtilization: 89, accuracy: 96, processTime: 0.1 },
    details: 'Enhanced shelf organization with RFID tracking'
  },
  'process-stocktake': {
    metrics: { oeeUtilization: 82, accuracy: 92.5, processTime: 4 },
    details: 'RFID-enabled stock counting with improved staff training'
  },
  'inventory-receiving': {
    metrics: { waitTime: 2 }
  },
  'inventory-storage': {
    metrics: { waitTime: 48 }
  },
  'inventory-transit': {
    metrics: { waitTime: 3 }
  }
};

// Ideal state changes (metrics and details for ideal state)
const idealStateChanges = {
  'process-receiving': {
    metrics: { oeeUtilization: 98, accuracy: 99.5, processTime: 1.5 },
    details: 'Fully automated receiving with supplier integration'
  },
  'process-storage': {
    metrics: { oeeUtilization: 96, accuracy: 99.5, processTime: 0.3, waitTime: 24 },
    details: 'Automated storage and retrieval system (ASRS)'
  },
  'process-distribution': {
    metrics: { oeeUtilization: 97, accuracy: 99, processTime: 0.4 },
    details: 'Automated guided vehicles (AGVs) for distribution'
  },
  'process-shopfloor': {
    metrics: { oeeUtilization: 95, accuracy: 99, processTime: 0.1 },
    details: 'Smart shelves with automatic replenishment'
  },
  'process-stocktake': {
    metrics: { oeeUtilization: 95, accuracy: 99.5, processTime: 1.6 },
    details: 'Real-time inventory management with AI optimization'
  },
  'inventory-receiving': {
    metrics: { waitTime: 1 }
  },
  'inventory-storage': {
    metrics: { waitTime: 24 }
  },
  'inventory-transit': {
    metrics: { waitTime: 0.5 }
  }
};