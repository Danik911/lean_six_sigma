import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Store, 
  Package, 
  BarChart2, 
  RefreshCw, 
  AlertTriangle, 
  Bell, 
  Database, 
  ArrowRight, 
  Settings, 
  Clock,
  CheckCircle,
  MessageSquare,
  Info,
  X
} from 'lucide-react';

// System information modal component defined outside main component
const InfoModal = ({ show, onClose }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[90vh] flex flex-col relative">
        {/* Fixed Header */}
        <div className="p-4 border-b bg-white rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-800">SimplePharma Digital Kanban System</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition z-10"
            style={{ position: 'relative', right: 0 }}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Scrollable Content - this is the key part */}
        <div className="overflow-y-auto" style={{ height: 'calc(90vh - 130px)' }}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">What is the Digital Kanban System?</h3>
            <p className="mb-4">
              The SimplePharma Digital Kanban System is an RFID-powered inventory management solution designed to 
              transform the pharmacy's stock replenishment process. Unlike the previous manual process that relied 
              on twice-daily visual checks, this system uses real-time RFID tracking to automatically monitor 
              inventory levels and trigger replenishment when needed.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">How It Addresses SimplePharma's Challenges</h3>
            <p className="mb-2">
              Based on the Lean Six Sigma DMAIC analysis, SimplePharma's current process suffers from several 
              inefficiencies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Waiting Waste:</strong> The current system has an average wait time of 5 hours between request and fulfillment. 
                The Digital Kanban reduces this to just 18 minutes (0.3 hours), a 94% improvement.
              </li>
              <li>
                <strong>Transportation Waste:</strong> Staff currently make multiple trips between buildings for visual checks and 
                replenishment. The new system consolidates these into fewer, more efficient trips, reducing transportation waste by 75%.
              </li>
              <li>
                <strong>Accuracy Issues:</strong> Manual counting during quarterly stock-takes leads to inconsistencies and duplicates. 
                RFID tracking provides 99.5% accuracy, eliminating the need for manual recounting.
              </li>
              <li>
                <strong>Process Bottlenecks:</strong> The current process requires staff to wait for team leaders to verify counts and 
                often involves recounting. The automated system eliminates these bottlenecks.
              </li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">How the System Works</h3>
            <p className="mb-2">
              The Digital Kanban System follows a pull-based approach to inventory management:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>
                <strong>Continuous Monitoring:</strong> RFID sensors attached to products and shelves constantly monitor inventory levels 
                across all locations.
              </li>
              <li>
                <strong>Threshold Triggers:</strong> When inventory falls to a predetermined threshold, the system automatically 
                changes the item status to "Pending," indicating it should be included in the next scheduled replenishment.
              </li>
              <li>
                <strong>Critical Level Alerts:</strong> If inventory reaches zero or a critical level, the system immediately triggers 
                a "Critical" alert, prompting immediate replenishment.
              </li>
              <li>
                <strong>Automated Replenishment:</strong> Instead of waiting for manual requests, the system automatically generates 
                replenishment orders based on actual demand.
              </li>
              <li>
                <strong>ERP Integration:</strong> All transactions are automatically synchronized with the Omega ERP system, maintaining 
                accurate inventory records without manual updates.
              </li>
            </ol>
            
            <h3 className="text-lg font-semibold mb-2">Interactive Features of This Demo</h3>
            <p className="mb-2">
              This interactive demonstration allows you to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>View real-time inventory status across the Shop Floor and Main Warehouse</li>
              <li>Observe how items are automatically flagged based on inventory thresholds</li>
              <li>Initiate manual replenishment by clicking the "Replenish" button on any items with yellow or red status</li>
              <li>Adjust simulation settings to test different scenarios</li>
              <li>Monitor system notifications that would alert staff to required actions</li>
              <li>Track key performance metrics showing improvement over the previous system</li>
              <li>Visualize the integration with the Omega ERP system</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">Implementation Benefits</h3>
            <p className="mb-2">
              Implementing this system would provide SimplePharma with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Elimination of revenue loss during quarterly stock-takes (currently 24 hours annually)</li>
              <li>95% reduction in inventory discrepancies and stockouts</li>
              <li>80% reduction in staff time spent on inventory tasks</li>
              <li>Improved demand forecasting accuracy leading to optimized inventory levels</li>
              <li>Enhanced customer experience through better product availability (99.5% target)</li>
              <li>Real-time visibility across all inventory locations</li>
              <li>Reduced waste in movement, waiting, and overprocessing</li>
            </ul>
            
            <p className="text-blue-600 font-medium mb-4">
              This system represents a key component of SimplePharma's digital transformation and Lean Six Sigma improvement initiative.
            </p>
            
            {/* Developer Credit in the modal */}
            <div className="text-center text-sm text-gray-500 italic mt-6 pt-4 border-t">
              Developed by Daniil Vladimirov for OpEx assignment
            </div>
          </div>
        </div>
        
        {/* Fixed Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg mt-auto">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  // All state declarations at the beginning of the component
  const [inventory, setInventory] = useState({
    medicalDevices: [
      { id: 'MD001', name: 'Blood Pressure Monitor', level: 5, threshold: 3, status: 'normal', location: 'shop' },
      { id: 'MD002', name: 'Glucose Meter', level: 2, threshold: 3, status: 'pending', location: 'shop' },
      { id: 'MD003', name: 'Thermometer', level: 1, threshold: 3, status: 'triggered', location: 'shop' },
      { id: 'MD004', name: 'Nebulizer', level: 7, threshold: 3, status: 'normal', location: 'warehouse' },
      { id: 'MD005', name: 'Oxygen Concentrator', level: 6, threshold: 3, status: 'normal', location: 'warehouse' }
    ],
    drugs: [
      { id: 'DR001', name: 'Antibiotic A', level: 8, threshold: 5, status: 'normal', location: 'shop' },
      { id: 'DR002', name: 'Pain Reliever', level: 3, threshold: 5, status: 'pending', location: 'shop' },
      { id: 'DR003', name: 'Antihistamine', level: 6, threshold: 5, status: 'normal', location: 'shop' },
      { id: 'DR004', name: 'Antacid', level: 12, threshold: 5, status: 'normal', location: 'warehouse' }
    ],
    miscellaneous: [
      { id: 'MS001', name: 'Vitamins', level: 4, threshold: 6, status: 'pending', location: 'shop' },
      { id: 'MS002', name: 'First Aid Kit', level: 2, threshold: 3, status: 'triggered', location: 'shop' },
      { id: 'MS003', name: 'Bandages', level: 9, threshold: 5, status: 'normal', location: 'warehouse' }
    ]
  });

  const [metrics, setMetrics] = useState({
    waitTime: 0.3, // hours, compared to previous 5 hours
    replenishmentTrips: 1, // compared to multiple trips before
    stockoutRate: 1.2, // percentage
    inventoryAccuracy: 99.5 // percentage
  });
  
  const [simSettings, setSimSettings] = useState({
    consumptionRate: 5, // seconds between consumption events
    thresholdMultiplier: 1, // multiplier for all thresholds
    autoReplenish: true // automatically replenish when triggered
  });
  
  const [erpStatus, setErpStatus] = useState({
    connected: true,
    lastSync: new Date().toLocaleTimeString(),
    pendingSyncs: 0,
    dataTransmissionStatus: 'normal' // normal, warning, error
  });
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      time: new Date().toLocaleTimeString(),
      message: 'System initialized and connected to RFID network',
      type: 'info'
    }
  ]);
  
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // State to track items being replenished for visual effects
  const [replenishingItems, setReplenishingItems] = useState({});
  
  // State for confirmation popup
  const [confirmationPopup, setConfirmationPopup] = useState({
    visible: false,
    message: '',
    position: { x: 0, y: 0 }
  });

  // All functions after state declarations
  // Function to calculate status counts
  const getStatusCounts = () => {
    const counts = { normal: 0, pending: 0, triggered: 0 };
    
    Object.values(inventory).flat().forEach(item => {
      if (item.location === 'shop') {
        counts[item.status]++;
      }
    });
    
    return counts;
  };

  // Calculate status counts
  const statusCounts = getStatusCounts();
  
  // Simulate replenishment
  const handleReplenish = (itemId, event) => {
    // Set the visual feedback for the replenishing item
    setReplenishingItems(prev => ({
      ...prev,
      [itemId]: true
    }));
    
    // Show confirmation popup near the button click
    if (event) {
      setConfirmationPopup({
        visible: true,
        message: 'Replenishment initiated',
        position: {
          x: event.clientX,
          y: event.clientY
        }
      });
      
      // Hide popup after 2 seconds
      setTimeout(() => {
        setConfirmationPopup(prev => ({
          ...prev,
          visible: false
        }));
      }, 2000);
    }
    
    // Add notification for replenishment request
    setNotifications(prev => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message: `Replenishment request initiated for item ${itemId}`,
        type: 'info'
      },
      ...prev.slice(0, 4)
    ]);
    
    // Update ERP status to show pending sync
    setErpStatus(prev => ({
      ...prev,
      pendingSyncs: prev.pendingSyncs + 1,
      dataTransmissionStatus: 'warning'
    }));
    
    // Simulate a delay for the transfer process (representing the improved process time)
    setTimeout(() => {
      setInventory(prevInventory => {
        const newInventory = {...prevInventory};
        
        Object.keys(newInventory).forEach(category => {
          const items = [...newInventory[category]];
          const itemIndex = items.findIndex(item => item.id === itemId);
          
          if (itemIndex !== -1) {
            // Find a warehouse item of the same type
            const warehouseItemIndex = newInventory[category].findIndex(
              item => item.location === 'warehouse' && item.name === items[itemIndex].name
            );
            
            if (warehouseItemIndex !== -1) {
              // Replenish from warehouse
              items[itemIndex] = {
                ...items[itemIndex],
                level: items[itemIndex].level + 5,
                status: 'normal'
              };
              
              newInventory[category] = items;
              
              // Add notification for completed replenishment
              setNotifications(prev => [
                {
                  id: Date.now(),
                  time: new Date().toLocaleTimeString(),
                  message: `${items[itemIndex].name} successfully replenished from warehouse`,
                  type: 'success'
                },
                ...prev.slice(0, 4)
              ]);
            }
          }
        });
        
        return newInventory;
      });
      
      // Update metrics after replenishment
      setMetrics(prev => ({
        ...prev,
        replenishmentTrips: prev.replenishmentTrips + 1
      }));
      
      // Reset ERP status after successful sync
      setErpStatus(prev => ({
        ...prev,
        lastSync: new Date().toLocaleTimeString(),
        pendingSyncs: Math.max(0, prev.pendingSyncs - 1),
        dataTransmissionStatus: 'normal'
      }));
      
      // Remove visual feedback for the replenishing item
      setReplenishingItems(prev => {
        const newState = {...prev};
        delete newState[itemId];
        return newState;
      });
      
    }, 1500); // Simulating the greatly improved wait time compared to the original 5 hours
  };
  
  // Handle simulation settings changes
  const updateSimSettings = (setting, value) => {
    setSimSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Apply threshold multiplier immediately
    if (setting === 'thresholdMultiplier') {
      setInventory(prevInventory => {
        const newInventory = {...prevInventory};
        
        Object.keys(newInventory).forEach(category => {
          newInventory[category] = newInventory[category].map(item => {
            // Adjust the threshold based on the original value for each item type
            const baseThreshold = {
              'Blood Pressure Monitor': 3,
              'Glucose Meter': 3,
              'Thermometer': 3,
              'Nebulizer': 3,
              'Oxygen Concentrator': 3,
              'Antibiotic A': 5,
              'Pain Reliever': 5,
              'Antihistamine': 5,
              'Antacid': 5,
              'Vitamins': 6,
              'First Aid Kit': 3,
              'Bandages': 5
            }[item.name] || 3;
            
            const newThreshold = Math.max(1, Math.round(baseThreshold * value));
            
            // Update the status based on the new threshold
            let newStatus = 'normal';
            if (item.level === 0) {
              newStatus = 'triggered';
            } else if (item.level <= newThreshold) {
              newStatus = 'pending';
            }
            
            return {
              ...item,
              threshold: newThreshold,
              status: newStatus
            };
          });
        });
        
        return newInventory;
      });
    }
  };

  // Effects after all functions
  // Simulation of RFID updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate consumption of items
      setInventory(prevInventory => {
        const newInventory = {...prevInventory};
        
        // Update one random item from each category
        Object.keys(newInventory).forEach(category => {
          const items = [...newInventory[category]];
          const randomIndex = Math.floor(Math.random() * items.length);
          
          if (items[randomIndex].location === 'shop' && items[randomIndex].level > 0) {
            const oldLevel = items[randomIndex].level;
            items[randomIndex] = {
              ...items[randomIndex],
              level: Math.max(0, items[randomIndex].level - 1)
            };
            
            // Update status based on level
            if (items[randomIndex].level === 0) {
              items[randomIndex].status = 'triggered';
              
              // Add notification for triggered items
              if (oldLevel > 0) {
                setNotifications(prev => [
                  {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString(),
                    message: `ALERT: ${items[randomIndex].name} (${items[randomIndex].id}) is out of stock!`,
                    type: 'critical'
                  },
                  ...prev.slice(0, 4) // Keep only the 5 most recent notifications
                ]);
                
                // Update ERP status to show pending sync
                setErpStatus(prev => ({
                  ...prev,
                  pendingSyncs: prev.pendingSyncs + 1
                }));
                
                // Auto-replenish if enabled
                if (simSettings.autoReplenish) {
                  setTimeout(() => handleReplenish(items[randomIndex].id), 2000);
                }
              }
            } else if (items[randomIndex].level <= items[randomIndex].threshold) {
              items[randomIndex].status = 'pending';
              
              // Add notification for items at threshold
              if (oldLevel > items[randomIndex].threshold) {
                setNotifications(prev => [
                  {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString(),
                    message: `${items[randomIndex].name} (${items[randomIndex].id}) has reached threshold level.`,
                    type: 'warning'
                  },
                  ...prev.slice(0, 4)
                ]);
              }
            }
          }
          
          newInventory[category] = items;
        });
        
        return newInventory;
      });
      
      // Simulate ERP sync occasionally
      if (Math.random() < 0.3) {
        setErpStatus(prev => ({
          ...prev,
          lastSync: new Date().toLocaleTimeString(),
          pendingSyncs: Math.max(0, prev.pendingSyncs - 1)
        }));
      }
      
    }, simSettings.consumptionRate * 1000);

    return () => clearInterval(interval);
  }, [simSettings.consumptionRate, simSettings.autoReplenish, handleReplenish]);

  // Component render
  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-800 mb-1">SimplePharma Digital Kanban System</h1>
          <p className="text-gray-600">RFID-Powered Pull System Implementation</p>
        </div>
        <button 
          onClick={() => setShowInfoModal(true)} 
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Info size={18} />
          <span>System Information</span>
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Metrics Dashboard */}
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <BarChart2 className="mr-2" size={20} />
            Real-Time Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-500">Avg. Wait Time</p>
              <p className="text-xl font-bold">{metrics.waitTime} hrs</p>
              <p className="text-xs text-green-600">-94% vs. manual</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-500">Replenishment Trips</p>
              <p className="text-xl font-bold">{metrics.replenishmentTrips}/day</p>
              <p className="text-xs text-green-600">-75% vs. manual</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-500">Stockout Rate</p>
              <p className="text-xl font-bold">{metrics.stockoutRate}%</p>
              <p className="text-xs text-green-600">-95% vs. manual</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-500">Inventory Accuracy</p>
              <p className="text-xl font-bold">{metrics.inventoryAccuracy}%</p>
              <p className="text-xs text-green-600">+23% vs. manual</p>
            </div>
          </div>
        </div>
        
        {/* ERP Omega Integration */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <Database className="mr-2" size={20} />
            ERP Omega Integration
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Connection Status:</span>
              <span className={`text-sm font-medium ${erpStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
                {erpStatus.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Last Sync:</span>
              <span className="text-sm">{erpStatus.lastSync}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Pending Transactions:</span>
              <span className={`text-sm font-medium ${erpStatus.pendingSyncs > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                {erpStatus.pendingSyncs}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Data Transmission:</span>
              <span className={`text-sm font-medium ${
                erpStatus.dataTransmissionStatus === 'normal' ? 'text-green-600' : 
                erpStatus.dataTransmissionStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {erpStatus.dataTransmissionStatus.charAt(0).toUpperCase() + erpStatus.dataTransmissionStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Simulation Controls */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <Settings className="mr-2" size={20} />
            Simulation Controls
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Consumption Rate</label>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={simSettings.consumptionRate} 
                  onChange={(e) => updateSimSettings('consumptionRate', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium">{simSettings.consumptionRate}s</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Threshold Multiplier</label>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.1"
                  value={simSettings.thresholdMultiplier} 
                  onChange={(e) => updateSimSettings('thresholdMultiplier', parseFloat(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium">×{simSettings.thresholdMultiplier.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-500">Auto-Replenish</label>
              <div 
                onClick={() => updateSimSettings('autoReplenish', !simSettings.autoReplenish)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                  simSettings.autoReplenish ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  simSettings.autoReplenish ? 'translate-x-6' : ''
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Process Flow Visualization */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <RefreshCw className="mr-2" size={20} />
          Pull System Workflow
        </h2>
        <div className="flex items-center justify-between">
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
            <Truck size={24} className="mx-auto mb-1 text-blue-700" />
            <div className="text-sm font-medium">Main Warehouse</div>
            <div className="text-xs text-gray-500">3rd Floor</div>
          </div>
          
          <div className="flex-1 flex flex-col items-center mx-3">
            <ArrowRight size={18} className="text-gray-400 rotate-180" />
            <div className="text-xs text-gray-500 my-1">RFID Triggers</div>
            <ArrowRight size={18} className="text-gray-400" />
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-center">
            <Package size={24} className="mx-auto mb-1 text-yellow-700" />
            <div className="text-sm font-medium">Storage Rooms</div>
            <div className="text-xs text-gray-500">First Floor</div>
          </div>
          
          <div className="flex-1 flex flex-col items-center mx-3">
            <ArrowRight size={18} className="text-gray-400 rotate-180" />
            <div className="text-xs text-gray-500 my-1">RFID Triggers</div>
            <ArrowRight size={18} className="text-gray-400" />
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
            <Store size={24} className="mx-auto mb-1 text-green-700" />
            <div className="text-sm font-medium">Shop Floor</div>
            <div className="text-xs text-gray-500">First Floor</div>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-4 text-xs text-center">
          <div>
            <div className="font-medium">Warehouse Response</div>
            <div className="text-gray-500">Items moved when triggered</div>
          </div>
          <div>
            <div className="font-medium">Digital Transfer</div>
            <div className="text-gray-500">RFID tracked in Omega ERP</div>
          </div>
          <div>
            <div className="font-medium">Real-time Visibility</div>
            <div className="text-gray-500">No manual checks needed</div>
          </div>
        </div>
      </div>
      
      {/* Main Kanban Board */}
      <div className="flex gap-4 mb-4">
        {/* Shop Building */}
        <div className="w-1/2 bg-white rounded-lg shadow">
          <div className="bg-blue-700 text-white p-2 rounded-t-lg flex items-center">
            <Store className="mr-2" size={20} />
            <h2 className="font-semibold">Shop Building (First Floor)</h2>
          </div>
          
          <div className="p-4">
            <div className="mb-4 flex justify-between">
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Normal: {statusCounts.normal}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending: {statusCounts.pending}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Triggered: {statusCounts.triggered}
                </span>
              </div>
              <div className="text-sm text-gray-500">RFID-monitored inventory</div>
            </div>
            
            {/* Product Categories */}
            <div className="space-y-4">
              {Object.entries(inventory).map(([category, items]) => (
                <div key={category} className="border rounded p-3">
                  <h3 className="font-medium mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <div className="space-y-2">
                    {items.filter(item => item.location === 'shop').map(item => (
                      <div 
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded border transition-all duration-300 ${
                          replenishingItems[item.id] ? 'bg-blue-100 border-blue-400 shadow-lg transform scale-105' :
                          item.status === 'normal' ? 'bg-green-50 border-green-200' :
                          item.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">ID: {item.id}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Inventory</div>
                            <div className={`font-bold ${
                              item.level <= item.threshold ? 'text-red-600' : 'text-gray-800'
                            }`}>
                              {item.level} units
                            </div>
                          </div>
                          {item.status !== 'normal' && (
                            <button 
                              onClick={(e) => handleReplenish(item.id, e)}
                              className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center relative"
                            >
                              <RefreshCw size={14} className={`mr-1 ${replenishingItems[item.id] ? 'animate-spin' : ''}`} />
                              <span className="text-xs">Replenish</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Warehouse Building */}
        <div className="w-1/2 bg-white rounded-lg shadow">
          <div className="bg-gray-700 text-white p-2 rounded-t-lg flex items-center">
            <Truck className="mr-2" size={20} />
            <h2 className="font-semibold">Main Warehouse (3rd Floor)</h2>
          </div>
          
          <div className="p-4">
            <div className="mb-4 flex justify-between">
              <div className="text-sm">
                <span className="font-medium">Available Stock</span> for replenishment
              </div>
              <div className="text-sm text-gray-500">
                <AlertTriangle size={14} className="inline mr-1" />
                Auto-order when below threshold
              </div>
            </div>
            
            {/* Warehouse Inventory */}
            <div className="space-y-4">
              {Object.entries(inventory).map(([category, items]) => (
                <div key={`wh-${category}`} className="border rounded p-3">
                  <h3 className="font-medium mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <div className="space-y-2">
                    {items.filter(item => item.location === 'warehouse').map(item => (
                      <div 
                        key={`wh-${item.id}`}
                        className="flex items-center justify-between p-2 rounded border bg-gray-50"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">ID: {item.id}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Warehouse Stock</div>
                          <div className="font-bold text-gray-800">{item.level} units</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Bell className="mr-2" size={20} />
          Staff Notifications
        </h2>
        <div className="space-y-2 max-h-36 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications yet</p>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-2 rounded text-sm flex items-start ${
                  notification.type === 'info' ? 'bg-blue-50 text-blue-800' :
                  notification.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                  notification.type === 'critical' ? 'bg-red-50 text-red-800' :
                  'bg-green-50 text-green-800'
                }`}
              >
                {notification.type === 'info' && <MessageSquare size={16} className="mr-2 mt-0.5 flex-shrink-0" />}
                {notification.type === 'warning' && <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />}
                {notification.type === 'critical' && <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />}
                {notification.type === 'success' && <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />}
                <div className="flex-1">
                  <span className="font-medium">[{notification.time}]</span> {notification.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* System Legend */}
      <div className="bg-white p-3 rounded shadow mb-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">System Legend:</span>
          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-1">Normal</span> Adequate inventory
          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-1">Pending</span> At/below threshold, replenishment scheduled
          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Triggered</span> Critical level, immediate replenishment needed
        </div>
      </div>
      
      {/* Developer Credit */}
      <div className="text-center text-sm text-gray-500 italic mb-2">
        Developed by Daniil Vladimirov for OpEx assignment
      </div>
      
      {/* Confirmation Popup */}
      {confirmationPopup.visible && (
        <div 
          className="fixed bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-out transition-opacity"
          style={{
            left: `${confirmationPopup.position.x}px`,
            top: `${confirmationPopup.position.y - 40}px`,
            opacity: 1,
            animation: 'fadeOut 2s ease-in-out'
          }}
        >
          {confirmationPopup.message}
        </div>
      )}
      
      {/* Welcome/Info Modals */}
      <InfoModal show={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} />
      <InfoModal show={showInfoModal} onClose={() => setShowInfoModal(false)} />
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-out {
          animation: fadeOut 2s forwards;
        }
      `}</style>
    </div>
  );
};

export default KanbanBoard;