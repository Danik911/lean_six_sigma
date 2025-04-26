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
  }
};

// Improvements data for each process node
const improvementsData = {
  'process-receiving': {
    improvements: [
      { type: 'rfid', data: 'RFID tagging at point of receipt' },
      { type: 'automation', data: 'Automated receiving process' }
    ]
  },
  'process-storage': {
    improvements: [
      { type: 'rfid', data: 'RFID inventory tracking' },
      { type: 'layout', data: 'Optimized warehouse layout' },
      { type: 'cloud', data: 'Cloud-based inventory management' }
    ]
  },
  'process-distribution': {
    improvements: [
      { type: 'layout', data: 'Optimized routes between locations' },
      { type: 'automation', data: 'Automated transfer notifications' }
    ]
  },
  'process-shopfloor': {
    improvements: [
      { type: 'rfid', data: 'RFID shelf readers for real-time tracking' },
      { type: 'realtime', data: 'Real-time inventory visibility' }
    ]
  },
  'process-stocktake': {
    improvements: [
      { type: 'rfid', data: 'RFID eliminates manual counting' },
      { type: 'automation', data: 'Continuous inventory tracking' },
      { type: 'ai', data: 'AI-powered inventory reconciliation' },
      { type: 'realtime', data: 'Real-time accuracy monitoring' }
    ]
  },
  'inventory-receiving': {
    improvements: [
      { type: 'automation', data: 'Reduced WIP waiting time: 1 hour' }
    ]
  },
  'inventory-storage': {
    improvements: [
      { type: 'ai', data: 'Reduced storage time: 48 hours' }
    ]
  },
  'inventory-transit': {
    improvements: [
      { type: 'layout', data: 'Optimized transit routes' }
    ]
  },
  'supplier-meddev': {
    improvements: [
      { type: 'supplier', data: 'Digital order integration' }
    ]
  },
  'supplier-drugseek': {
    improvements: [
      { type: 'supplier', data: 'Automated reordering' }
    ]
  },
  'supplier-vitafast': {
    improvements: [
      { type: 'supplier', data: 'Demand-based delivery scheduling' }
    ]
  }
};

// Future state changes for each process
const futureStateChanges = {
  'process-receiving': {
    metrics: {
      oeeUtilization: 97,
      accuracy: 98,
      processTime: 2.1
    },
    details: 'Automated receiving with RFID tagging'
  },
  'process-storage': {
    metrics: {
      oeeUtilization: 94,
      accuracy: 92.5,
      processTime: 0.5,
      waitTime: 48
    },
    details: 'Cloud-managed inventory with RFID tracking'
  },
  'process-distribution': {
    metrics: {
      oeeUtilization: 92,
      accuracy: 95,
      processTime: 0.8
    },
    details: 'Optimized routes with real-time transfer updates'
  },
  'process-shopfloor': {
    metrics: {
      oeeUtilization: 90,
      accuracy: 98,
      processTime: 0.1
    },
    details: 'RFID-enabled shelves with real-time inventory tracking'
  },
  'process-stocktake': {
    metrics: {
      oeeUtilization: 90,
      accuracy: 92.5,
      processTime: 2.3
    },
    details: 'Continuous RFID-based counting replacing quarterly counts'
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