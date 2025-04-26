// Improvement icons for the Value Stream Map
const improvementIcons = {
  rfid: { 
    icon: '📶', 
    name: 'RFID Implementation', 
    color: 'bg-blue-200 border-blue-500',
    description: 'RFID tags and readers for real-time inventory tracking'
  },
  automation: { 
    icon: '🤖', 
    name: 'Process Automation', 
    color: 'bg-purple-200 border-purple-500',
    description: 'Automated processes replacing manual work'
  },
  cloud: { 
    icon: '☁️', 
    name: 'Cloud Integration', 
    color: 'bg-teal-200 border-teal-500',
    description: 'AWS cloud infrastructure for data storage and processing'
  },
  layout: { 
    icon: '🔄', 
    name: 'Layout Optimization', 
    color: 'bg-green-200 border-green-500',
    description: 'Optimized physical layout for efficient movement'
  },
  ai: { 
    icon: '🧠', 
    name: 'AI/ML Integration', 
    color: 'bg-indigo-200 border-indigo-500',
    description: 'AI-powered demand forecasting and inventory optimization'
  },
  training: { 
    icon: '👨‍🎓', 
    name: 'Staff Training', 
    color: 'bg-orange-200 border-orange-500',
    description: 'Enhanced staff training on new systems and processes'
  },
  realtime: { 
    icon: '⚡', 
    name: 'Real-time Monitoring', 
    color: 'bg-yellow-200 border-yellow-500',
    description: 'Real-time dashboards for performance monitoring'
  },
  supplier: { 
    icon: '🔗', 
    name: 'Supplier Integration', 
    color: 'bg-pink-200 border-pink-500',
    description: 'Enhanced digital integration with suppliers'
  },
  // Lean tools icons
  fives: { 
    icon: '🧹', 
    name: '5S Methodology', 
    color: 'bg-green-100 border-green-400',
    description: 'Sort, Set in order, Shine, Standardize, Sustain for workplace organization'
  },
  kanban: { 
    icon: '🎫', 
    name: 'Kanban System', 
    color: 'bg-blue-100 border-blue-400',
    description: 'Visual inventory management and pull system'
  },
  pokayoke: { 
    icon: '🛡️', 
    name: 'Poka-Yoke', 
    color: 'bg-red-100 border-red-400',
    description: 'Error-proofing mechanisms to prevent defects'
  },
  standardwork: { 
    icon: '📋', 
    name: 'Standard Work', 
    color: 'bg-gray-100 border-gray-400',
    description: 'Standardized procedures for consistent execution'
  },
  visualmgmt: { 
    icon: '👁️', 
    name: 'Visual Management', 
    color: 'bg-purple-100 border-purple-400',
    description: 'Visual controls and indicators for process status'
  },
  jit: { 
    icon: '⏱️', 
    name: 'Just-In-Time', 
    color: 'bg-yellow-100 border-yellow-400',
    description: 'Materials delivered only when needed to reduce waste'
  },
  kaizen: { 
    icon: '📈', 
    name: 'Kaizen', 
    color: 'bg-indigo-100 border-indigo-400',
    description: 'Continuous improvement culture and mindset'
  },
  heijunka: { 
    icon: '⚖️', 
    name: 'Heijunka', 
    color: 'bg-pink-100 border-pink-400',
    description: 'Production leveling to balance workload'
  }
};

// Improvements data for each process node - FOR IMPROVED STATE
const improvementsData = {
  'process-receiving': {
    improvements: [
      { type: 'rfid', data: 'Basic RFID tagging at point of receipt' },
      { type: 'standardwork', data: 'Standardized receiving procedures' }
    ]
  },
  'process-storage': {
    improvements: [
      { type: 'rfid', data: 'RFID inventory tracking' },
      { type: 'layout', data: 'Optimized warehouse layout' },
      { type: 'fives', data: '5S implementation for organization' },
      { type: 'kanban', data: 'Visual inventory management system' }
    ]
  },
  'process-distribution': {
    improvements: [
      { type: 'layout', data: 'Optimized routes between locations' },
      { type: 'standardwork', data: 'Standardized transport procedures' },
      { type: 'visualmgmt', data: 'Visual status indicators for transfers' }
    ]
  },
  'process-shopfloor': {
    improvements: [
      { type: 'rfid', data: 'Basic RFID shelf readers' },
      { type: 'kanban', data: 'Visual signals for replenishment' },
      { type: 'fives', data: 'Organized shop floor layout' }
    ]
  },
  'process-stocktake': {
    improvements: [
      { type: 'rfid', data: 'RFID-assisted counting' },
      { type: 'pokayoke', data: 'Error-proofing in counting process' },
      { type: 'standardwork', data: 'Standardized counting procedures' },
      { type: 'kaizen', data: 'Continuous improvement in inventory accuracy' }
    ]
  },
  'inventory-receiving': {
    improvements: [
      { type: 'jit', data: 'Just-in-time processing of received goods' }
    ]
  },
  'inventory-storage': {
    improvements: [
      { type: 'fives', data: 'Organized storage areas' }
    ]
  },
  'inventory-transit': {
    improvements: [
      { type: 'layout', data: 'Optimized transit routes' },
      { type: 'heijunka', data: 'Balanced workload for transit staff' }
    ]
  },
  'supplier-meddev': {
    improvements: [
      { type: 'jit', data: 'Just-in-time ordering system' }
    ]
  },
  'supplier-drugseek': {
    improvements: [
      { type: 'kanban', data: 'Kanban-based replenishment signals' }
    ]
  },
  'supplier-vitafast': {
    improvements: [
      { type: 'heijunka', data: 'Leveled ordering pattern' }
    ]
  }
};

// Improvements data for ideal state (separated for clarity)
const idealImprovementsData = {
  'process-receiving': {
    improvements: [
      { type: 'automation', data: 'Fully automated receiving process' },
      { type: 'cloud', data: 'Cloud integration with suppliers' },
      { type: 'pokayoke', data: 'Advanced error-proofing systems' },
      { type: 'ai', data: 'AI verification of received goods' }
    ]
  },
  'process-storage': {
    improvements: [
      { type: 'cloud', data: 'Advanced cloud-based inventory management' },
      { type: 'ai', data: 'AI-powered inventory optimization' },
      { type: 'automation', data: 'Automated storage and retrieval systems' }
    ]
  },
  'process-distribution': {
    improvements: [
      { type: 'automation', data: 'Autonomous transport systems' },
      { type: 'jit', data: 'Just-in-time delivery between locations' },
      { type: 'realtime', data: 'Real-time tracking of all items' }
    ]
  },
  'process-shopfloor': {
    improvements: [
      { type: 'realtime', data: 'Advanced real-time inventory visibility' },
      { type: 'ai', data: 'AI-powered demand prediction' },
      { type: 'visualmgmt', data: 'Electronic display shelf labels' },
      { type: 'automation', data: 'Automated shelf restocking' }
    ]
  },
  'process-stocktake': {
    improvements: [
      { type: 'automation', data: 'Continuous inventory tracking' },
      { type: 'ai', data: 'AI-powered inventory reconciliation' },
      { type: 'realtime', data: 'Real-time accuracy monitoring' },
      { type: 'cloud', data: 'Cloud-based perpetual inventory system' }
    ]
  },
  'inventory-receiving': {
    improvements: [
      { type: 'automation', data: 'Automated WIP movement' },
      { type: 'ai', data: 'AI-optimized inventory flow' }
    ]
  },
  'inventory-storage': {
    improvements: [
      { type: 'ai', data: 'AI-reduced storage time: 24 hours' },
      { type: 'automation', data: 'Automated storage organization' }
    ]
  },
  'inventory-transit': {
    improvements: [
      { type: 'automation', data: 'Autonomous material movement' },
      { type: 'realtime', data: 'Real-time transit tracking' }
    ]
  },
  'supplier-meddev': {
    improvements: [
      { type: 'supplier', data: 'Advanced digital order integration' },
      { type: 'ai', data: 'AI-predicted order requirements' }
    ]
  },
  'supplier-drugseek': {
    improvements: [
      { type: 'supplier', data: 'Automated reordering' },
      { type: 'cloud', data: 'Cloud-based inventory sharing' }
    ]
  },
  'supplier-vitafast': {
    improvements: [
      { type: 'supplier', data: 'Demand-based delivery scheduling' },
      { type: 'realtime', data: 'Real-time supplier information sharing' }
    ]
  }
};

// Function to get improvements based on view mode
function getImprovements(processId, viewMode) {
  if (viewMode === 'ideal' && idealImprovementsData[processId]) {
    return idealImprovementsData[processId].improvements;
  } else if (viewMode === 'improved' && improvementsData[processId]) {
    return improvementsData[processId].improvements;
  }
  return [];
}

// Future state changes for each process
const futureStateChanges = {
  'process-receiving': {
    metrics: {
      oeeUtilization: 94,
      accuracy: 92,
      processTime: 2.7
    },
    details: 'Semi-automated receiving with RFID tagging'
  },
  'process-storage': {
    metrics: {
      oeeUtilization: 90,
      accuracy: 88,
      processTime: 0.6,
      waitTime: 48
    },
    details: 'Improved inventory with RFID tracking'
  },
  'process-distribution': {
    metrics: {
      oeeUtilization: 89,
      accuracy: 90,
      processTime: 0.9
    },
    details: 'Optimized routes with better transfer procedures'
  },
  'process-shopfloor': {
    metrics: {
      oeeUtilization: 87,
      accuracy: 94,
      processTime: 0.1
    },
    details: 'RFID-assisted shelves with better organization'
  },
  'process-stocktake': {
    metrics: {
      oeeUtilization: 85,
      accuracy: 88,
      processTime: 3.0
    },
    details: 'RFID-assisted counting replacing manual quarterly counts'
  }
};

// Ideal state changes for each process
const idealStateChanges = {
  'process-receiving': {
    metrics: {
      oeeUtilization: 99,
      accuracy: 99.5,
      processTime: 1.5
    },
    details: 'Fully automated receiving with AI verification'
  },
  'process-storage': {
    metrics: {
      oeeUtilization: 98,
      accuracy: 99.5,
      processTime: 0.3,
      waitTime: 24
    },
    details: 'AI-optimized inventory with predictive management'
  },
  'process-distribution': {
    metrics: {
      oeeUtilization: 97,
      accuracy: 99,
      processTime: 0.5
    },
    details: 'Autonomous transport systems between locations'
  },
  'process-shopfloor': {
    metrics: {
      oeeUtilization: 96,
      accuracy: 99.5,
      processTime: 0.1
    },
    details: 'Smart shelves with automatic replenishment triggering'
  },
  'process-stocktake': {
    metrics: {
      oeeUtilization: 98,
      accuracy: 99.5,
      processTime: 0
    },
    details: 'Real-time perpetual inventory eliminates traditional counting'
  }
};