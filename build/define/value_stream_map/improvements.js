// Improvement icons and descriptions using React icons
// With fallback to emoji when ReactIcons is not available
var improvementIcons = {
  rfid: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.FaTag) : '🏷️', 
    name: 'RFID Implementation', 
    color: 'bg-purple-200 border-purple-500' 
  },
  layout: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.MdDashboard) : '📊', 
    name: 'Layout Optimization', 
    color: 'bg-blue-200 border-blue-500' 
  },
  automation: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.FaRobot) : '🤖', 
    name: 'Automation', 
    color: 'bg-green-200 border-green-500' 
  },
  training: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.FaGraduationCap) : '🎓', 
    name: 'Training Program', 
    color: 'bg-yellow-200 border-yellow-500' 
  },
  kaizen: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.FaBolt) : '⚡', 
    name: 'Kaizen Event', 
    color: 'bg-red-200 border-red-500' 
  },
  kanban: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.MdOutlineViewKanban) : '📊', 
    name: 'Kanban System', 
    color: 'bg-indigo-200 border-indigo-500' 
  },
  pull: { 
    icon: typeof ReactIcons !== 'undefined' ? (ReactIcons.FaArrowDown ? React.createElement(ReactIcons.FaArrowDown) : '⤵️') : '⤵️', 
    name: 'Pull System', 
    color: 'bg-orange-200 border-orange-500' 
  },
  sop: { 
    icon: typeof ReactIcons !== 'undefined' ? React.createElement(ReactIcons.FaFileAlt) : '📝', 
    name: 'Standard Operating Procedure', 
    color: 'bg-teal-200 border-teal-500' 
  }
};

// Improvement data for each process node
const improvementsData = {
  'process-receiving': {
    improvements: [
      { type: 'rfid', data: 'RFID tagging at receiving for automated tracking' },
      { type: 'sop', data: 'Standardized receiving procedures with visual management' }
    ],
    improved: [
      { type: 'rfid', data: 'RFID-assisted receiving' },
      { type: 'sop', data: 'Standardized receiving procedures' }
    ],
    ideal: [
      { type: 'automation', data: 'Continuous inventory tracking' },
      { type: 'kaizen', data: 'Continuous improvement in inventory accuracy' },
      { type: 'automation', data: 'AI-powered inventory reconciliation' },
      { type: 'automation', data: 'Cloud-based perpetual inventory system' }
    ]
  },
  'process-storage': {
    improvements: [
      { type: 'layout', data: 'Reorganized storage layout by frequency of use' },
      { type: 'kanban', data: 'Implemented kanban system with visual indicators' }
    ],
    improved: [
      { type: 'layout', data: 'Layout optimization for storage' },
      { type: 'kanban', data: 'Kanban system for inventory management' }
    ],
    ideal: [
      { type: 'automation', data: 'Automated storage and retrieval system (ASRS)' },
      { type: 'automation', data: 'Real-time monitoring' },
      { type: 'kaizen', data: 'Continuous improvement in storage process' }
    ]
  },
  'process-distribution': {
    improvements: [
      { type: 'pull', data: 'Implemented pull system based on shop floor demand' },
      { type: 'automation', data: 'Automated notification system for replenishment' }
    ],
    improved: [
      { type: 'pull', data: 'Pull-based distribution' },
      { type: 'automation', data: 'Automated notifications for distribution' }
    ],
    ideal: [
      { type: 'automation', data: 'Automated guided vehicles (AGVs) for distribution' },
      { type: 'automation', data: 'Real-time distribution monitoring' }
    ]
  },
  'process-shopfloor': {
    improvements: [
      { type: 'rfid', data: 'RFID-enabled shelves for real-time inventory tracking' },
      { type: 'layout', data: 'Optimized product placement based on sales data' }
    ],
    improved: [
      { type: 'rfid', data: 'RFID-enabled shelves' },
      { type: 'layout', data: 'Optimized product placement' }
    ],
    ideal: [
      { type: 'automation', data: 'Smart shelves with automatic replenishment' },
      { type: 'automation', data: 'Real-time monitoring' }
    ]
  },
  'process-stocktake': {
    improvements: [
      { type: 'rfid', data: 'RFID handheld scanners for accurate inventory counts' },
      { type: 'training', data: 'Enhanced staff training program with certification' },
      { type: 'kaizen', data: 'Conducted kaizen event to streamline process' }
    ],
    improved: [
      { type: 'rfid', data: 'RFID-assisted counting' },
      { type: 'training', data: 'Staff certification program' },
      { type: 'kaizen', data: 'Error-proofing in counting process' },
      { type: 'sop', data: 'Standardized counting procedures' },
      { type: 'kaizen', data: 'Continuous improvement in inventory accuracy' }
    ],
    ideal: [
      { type: 'automation', data: 'Continuous inventory tracking' },
      { type: 'automation', data: 'AI-powered inventory reconciliation' },
      { type: 'automation', data: 'Real-time accuracy monitoring' },
      { type: 'automation', data: 'Cloud-based perpetual inventory system' }
    ]
  },
  'inventory-receiving': {
    improvements: [
      { type: 'pull', data: 'Reduced WIP with just-in-time processing' }
    ],
    improved: [
      { type: 'pull', data: 'Just-in-time processing' }
    ],
    ideal: [
      { type: 'automation', data: 'Fully automated receiving' }
    ]
  },
  'inventory-storage': {
    improvements: [
      { type: 'kanban', data: 'Implemented kanban cards for inventory management' }
    ],
    improved: [
      { type: 'kanban', data: 'Kanban cards for inventory management' }
    ],
    ideal: [
      { type: 'automation', data: 'Automated storage management' }
    ]
  },
  'inventory-transit': {
    improvements: [
      { type: 'layout', data: 'Optimized transit routes between locations' }
    ],
    improved: [
      { type: 'layout', data: 'Optimized transit routes' }
    ],
    ideal: [
      { type: 'automation', data: 'Automated transit system' }
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