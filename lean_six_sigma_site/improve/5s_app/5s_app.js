import React, { useState, useEffect } from 'react';
import { BarChart2, Tag, Layers, CheckCircle, ClipboardList, Award, Camera, Zap, Search, AlertCircle, FileText, ArrowUp, X, Clock, Smartphone, Info, ThumbsUp, Bell } from 'lucide-react';

// Main App Component
const SimplePharma5S = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showShelfScanModal, setShowShelfScanModal] = useState(false);
  const [showShiftScanModal, setShowShiftScanModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSubmitFeedback, setShowSubmitFeedback] = useState(false);
  const [scanningStatus, setScanningStatus] = useState('idle'); // idle, scanning, complete
  const [scanningProgress, setScanningProgress] = useState(0);
  const [scanResults, setScanResults] = useState(null);
  
  // Show info modal on first launch
  useEffect(() => {
    setShowInfoModal(true);
  }, []);

  // Simulated metrics
  const inventoryMetrics = {
    accuracyRate: 76.5,
    targetAccuracy: 99.5,
    stockoutRate: 8.2,
    timeSpentSearching: 4.2
  };

  // Simulate shelf scanning function
  const simulateShelfScan = () => {
    setScanningStatus('scanning');
    setScanningProgress(0);
    setScanResults(null);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanningProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanningStatus('complete');
          
          // Generate simulated results
          const simulatedResults = {
            scannedItems: 47,
            issues: [
              { type: 'Misplaced Item', description: 'Blood Glucose Monitor found in OTC Medication section', severity: 'high' },
              { type: 'Low Stock', description: 'Acetaminophen 500mg below minimum threshold (3 units remaining)', severity: 'medium' },
              { type: 'Tag Missing', description: 'RFID tag missing on Insulin Storage Case', severity: 'high' },
              { type: 'Facing Issue', description: 'Product labels not facing forward in Supplements section', severity: 'low' }
            ],
            consistencyScore: 82
          };
          
          setScanResults(simulatedResults);
        }
        return newProgress;
      });
    }, 100);
  };

  // Simulate end of shift scan function
  const simulateShiftScan = () => {
    setScanningStatus('scanning');
    setScanningProgress(0);
    setScanResults(null);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanningProgress(prev => {
        const newProgress = prev + 3;
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanningStatus('complete');
          
          // Generate simulated results
          const simulatedResults = {
            areas: {
              sort: 88,
              set: 92,
              shine: 76,
              standardize: 95,
              sustain: 85
            },
            overallScore: 87,
            points: 175,
            insights: [
              "Great job on tool organization today!",
              "Shine score needs improvement - dust detected on shelf C4",
              "Achieved 'Standardization Master' badge for consistent label placement"
            ]
          };
          
          setScanResults(simulatedResults);
        }
        return newProgress;
      });
    }, 100);
  };

  // Reset scan state
  const resetScan = () => {
    setScanningStatus('idle');
    setScanningProgress(0);
    setScanResults(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">SimplePharma 5S Digital Organization System</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-800 px-3 py-1 rounded-md">
              <span className="mr-2">Inventory Accuracy:</span>
              <span className={`font-bold ${inventoryMetrics.accuracyRate < 90 ? 'text-red-300' : 'text-green-300'}`}>
                {inventoryMetrics.accuracyRate}%
              </span>
            </div>
            <button 
              onClick={() => setShowInfoModal(true)}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md flex items-center"
            >
              <Info size={16} className="mr-2" />
              <span>Info</span>
            </button>
            <button 
              onClick={() => setShowShelfScanModal(true)}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md flex items-center"
            >
              <Camera size={16} className="mr-2" />
              <span>Scan Shelves</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="flex bg-white shadow-md overflow-x-auto">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-3 font-medium flex items-center ${activeTab === 'dashboard' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          <BarChart2 size={18} className="mr-1" />
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('sort')}
          className={`px-4 py-3 font-medium flex items-center ${activeTab === 'sort' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          <Tag size={18} className="mr-1" />
          1. Sort
        </button>
        <button 
          onClick={() => setActiveTab('set')}
          className={`px-4 py-3 font-medium flex items-center ${activeTab === 'set' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          <Layers size={18} className="mr-1" />
          2. Set in Order
        </button>
        <button 
          onClick={() => setActiveTab('shine')}
          className={`px-4 py-3 font-medium flex items-center ${activeTab === 'shine' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          <CheckCircle size={18} className="mr-1" />
          3. Shine
        </button>
        <button 
          onClick={() => setActiveTab('standardize')}
          className={`px-4 py-3 font-medium flex items-center ${activeTab === 'standardize' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          <ClipboardList size={18} className="mr-1" />
          4. Standardize
        </button>
        <button 
          onClick={() => setActiveTab('sustain')}
          className={`px-4 py-3 font-medium flex items-center ${activeTab === 'sustain' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          <Award size={18} className="mr-1" />
          5. Sustain
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'dashboard' && <Dashboard metrics={inventoryMetrics} onOpenShiftScan={() => setShowShiftScanModal(true)} />}
        {activeTab === 'sort' && <Sort />}
        {activeTab === 'set' && <SetInOrder />}
        {activeTab === 'shine' && <Shine />}
        {activeTab === 'standardize' && <Standardize />}
        {activeTab === 'sustain' && <Sustain onOpenShiftScan={() => setShowShiftScanModal(true)} />}
      </div>

      {/* Shelf Scanning Modal */}
      {showShelfScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center">
                <Camera size={24} className="mr-2 text-blue-600" />
                {scanningStatus === 'idle' ? 'Shelf Scanning Simulation' : 
                 scanningStatus === 'scanning' ? 'Scanning in Progress...' : 
                 'Scan Results'}
              </h2>
              <button onClick={() => {resetScan(); setShowShelfScanModal(false);}} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {scanningStatus === 'idle' && (
                <div className="text-center">
                  <div className="mb-4 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <Smartphone size={64} className="mx-auto text-blue-500 mb-3" />
                    <p className="text-gray-700 mb-3">
                      This feature simulates using a smartphone camera to scan shelves and identify 5S issues in real-time.
                    </p>
                    <p className="text-sm text-gray-500 italic mb-4">
                      Note: This is a simulation for demonstration purposes only.
                    </p>
                    <select className="w-full p-2 border border-gray-300 rounded-md mb-4">
                      <option value="zone-a">Zone A - Prescription Medications</option>
                      <option value="zone-b">Zone B - OTC Medications</option>
                      <option value="zone-c">Zone C - Medical Devices</option>
                      <option value="zone-d">Zone D - Supplements</option>
                    </select>
                  </div>
                  <button 
                    onClick={simulateShelfScan}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full"
                  >
                    <Zap size={20} className="mr-2" />
                    Start Scanning Simulation
                  </button>
                </div>
              )}
              
              {scanningStatus === 'scanning' && (
                <div className="text-center">
                  <div className="relative mb-8 mt-4">
                    <div className="w-64 h-64 mx-auto relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-lg bg-gray-200 overflow-hidden">
                          <img 
                            src="/api/placeholder/400/400" 
                            alt="Camera view simulation" 
                            className="w-full h-full object-cover opacity-50"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-lg"></div>
                      <div className="absolute inset-x-0 top-0 h-1 bg-blue-500 animate-pulse"></div>
                      <div className="absolute inset-y-0 right-0 w-1 bg-blue-500 animate-pulse"></div>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 animate-pulse"></div>
                      <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-ping absolute w-12 h-12 rounded-full bg-blue-400 opacity-75"></div>
                      <div className="relative w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold">5S</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg font-medium mb-2">Analyzing shelf organization...</p>
                  <p className="text-sm text-gray-500 mb-4">Please hold steady while the scan completes</p>
                  
                  <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
                    <div 
                      className="h-3 rounded-full bg-blue-600 transition-all duration-300" 
                      style={{ width: `${scanningProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{scanningProgress}% complete</p>
                </div>
              )}
              
              {scanningStatus === 'complete' && scanResults && (
                <div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-green-800">Scan Complete</h3>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {scanResults.scannedItems} items processed
                      </span>
                    </div>
                    <p className="text-green-700">Shelf consistency score: <span className="font-bold">{scanResults.consistencyScore}%</span></p>
                  </div>
                  
                  <h3 className="font-medium text-lg mb-3">Detected Issues:</h3>
                  <div className="space-y-3 mb-6">
                    {scanResults.issues.map((issue, index) => (
                      <div 
                        key={index} 
                        className={`p-3 border rounded-md ${
                          issue.severity === 'high' ? 'border-red-200 bg-red-50' :
                          issue.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                          'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {issue.type}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                            issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Priority
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => {resetScan(); setShowShelfScanModal(false);}}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md font-medium"
                    >
                      Close
                    </button>
                    <button 
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Generate Action Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* App Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" style={{ position: 'fixed', overflow: 'hidden' }}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4" style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold flex items-center">
                <Info size={24} className="mr-2 text-blue-600" />
                SimplePharma 5S Digital Organization
              </h2>
              <button onClick={() => setShowInfoModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6" style={{ overflowY: 'auto' }}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">About This Application</h3>
                <p className="text-sm mb-3">
                  This application demonstrates how digital tools enhance 5S workplace organization in a pharmacy environment,
                  showing how technologies like RFID, computer vision, and digital auditing transform traditional practices.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Note: This is a simulation for demonstration purposes only.
                </p>
              </div>
              
              <h3 className="font-semibold mb-3">The 5S Principles</h3>
              <div className="grid grid-cols-1 gap-3 mb-6">
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <Tag size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">1. Sort (Seiri)</h4>
                  </div>
                  <p className="text-xs text-gray-700 ml-6">
                    Separate necessary from unnecessary items. Our digital system helps classify inventory by usage frequency.
                  </p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <Layers size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">2. Set in Order (Seiton)</h4>
                  </div>
                  <p className="text-xs text-gray-700 ml-6">
                    Ensure everything has a designated place. Digital planograms guide proper placement and retrieval.
                  </p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <CheckCircle size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">3. Shine (Seiso)</h4>
                  </div>
                  <p className="text-xs text-gray-700 ml-6">
                    Keep the workplace clean. Digital checklists and IoT sensors monitor cleanliness standards.
                  </p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <ClipboardList size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">4. Standardize (Seiketsu)</h4>
                  </div>
                  <p className="text-xs text-gray-700 ml-6">
                    Ensure consistent application of best practices. Digital work instructions guide procedures.
                  </p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <Award size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">5. Sustain (Shitsuke)</h4>
                  </div>
                  <p className="text-xs text-gray-700 ml-6">
                    Maintain discipline through regular audits. Digital audits and gamification keep staff engaged.
                  </p>
                </div>
              </div>
              
              <h3 className="font-semibold mb-3">Key Features</h3>
              <div className="space-y-4 mb-6">
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-2">
                    <Camera size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">Shelf Scanning</h4>
                  </div>
                  <p className="text-xs text-gray-700 mb-2 ml-6">
                    Simulates using smartphone cameras to identify organizational inconsistencies in real-time.
                  </p>
                  <div className="ml-6 bg-gray-50 p-2 rounded text-xs">
                    <span className="font-medium">How to use:</span> Click "Scan Shelves" button in header → Select zone → 
                    Start scanning → Review issues → Generate action plan
                  </div>
                </div>
                
                <div className="p-3 bg-white border border-gray-200 rounded-md">
                  <div className="flex items-center mb-2">
                    <Clock size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="font-medium">End-of-Shift Compliance Scan</h4>
                  </div>
                  <p className="text-xs text-gray-700 mb-2 ml-6">
                    Simulates how staff verify 5S compliance at shift end and earn points for maintaining standards.
                  </p>
                  <div className="ml-6 bg-gray-50 p-2 rounded text-xs">
                    <span className="font-medium">How to use:</span> Click "End-of-Shift Scan" → Review shift info → 
                    Begin scan → Review 5S scores → Submit results → View badges
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                <h3 className="font-medium text-green-800 mb-2">Getting Started</h3>
                <p className="text-xs text-gray-700">
                  Explore the dashboard first, then navigate through each principle tab to learn how digital tools 
                  enhance 5S. Try the scanning simulations to see how technology helps identify issues and verify compliance.
                </p>
              </div>
              
              <div className="text-center py-4 border-t border-gray-200 mt-4">
                <p className="text-xs text-gray-500">
                  Developed by Daniil Vladimirov for OpEx assignment
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white z-10">
              <button 
                onClick={() => setShowInfoModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-medium w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* End of Shift Scan Modal */}
      {showShiftScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center">
                <Clock size={24} className="mr-2 text-blue-600" />
                {scanningStatus === 'idle' ? 'End-of-Shift 5S Compliance Scan' : 
                 scanningStatus === 'scanning' ? 'Scanning Workplace...' : 
                 'Shift Compliance Results'}
              </h2>
              <button onClick={() => {resetScan(); setShowShiftScanModal(false);}} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {scanningStatus === 'idle' && (
                <div className="text-center">
                  <div className="mb-4 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <Clock size={64} className="mx-auto text-blue-500 mb-3" />
                    <p className="text-gray-700 mb-3">
                      This simulation demonstrates how staff can perform end-of-shift scans to verify 5S compliance
                      and earn points for maintaining workplace organization standards.
                    </p>
                    <p className="text-sm text-gray-500 italic mb-4">
                      Note: This is a simulation for demonstration purposes only.
                    </p>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="font-medium mb-1">Current Shift Information</p>
                      <div className="flex justify-between text-sm">
                        <span>Shift: Morning (6:00 AM - 2:00 PM)</span>
                        <span>Date: Apr 23, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Staff: J. Thompson</span>
                        <span>Area: Zone C - Medical Devices</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={simulateShiftScan}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full"
                  >
                    <Zap size={20} className="mr-2" />
                    Begin End-of-Shift Scan
                  </button>
                </div>
              )}
              
              {scanningStatus === 'scanning' && (
                <div className="text-center">
                  <div className="relative mb-8 mt-4">
                    <div className="w-full h-32 mx-auto relative mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-lg bg-blue-50 overflow-hidden border border-blue-200">
                          <div className="absolute inset-0 flex flex-wrap content-center justify-around p-2">
                            <div className="m-1 w-8 h-8 bg-blue-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-green-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-yellow-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-red-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-purple-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-blue-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-green-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-yellow-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-blue-200 rounded-sm"></div>
                            <div className="m-1 w-8 h-8 bg-purple-200 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg font-medium mb-2">Analyzing workplace organization...</p>
                    <p className="text-sm text-gray-500 mb-4">Evaluating all 5S principles</p>
                    
                    <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
                      <div 
                        className="h-3 rounded-full bg-blue-600 transition-all duration-300" 
                        style={{ width: `${scanningProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{scanningProgress}% complete</p>
                    
                    <div className="text-left space-y-1 text-sm text-gray-500">
                      <p>✓ Checking Sort implementation...</p>
                      <p>✓ Evaluating Set in Order status...</p>
                      <p>✓ Measuring Shine compliance...</p>
                      <p className="text-blue-600 font-medium">➤ Analyzing Standardize adherence...</p>
                      <p>Pending: Sustain verification...</p>
                    </div>
                  </div>
                </div>
              )}
              
              {scanningStatus === 'complete' && scanResults && (
                <div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-blue-800">Shift Compliance Report</h3>
                      <span className="text-2xl font-bold text-blue-800">
                        {scanResults.overallScore}<span className="text-base font-normal">/100</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-700 mr-2">Points earned:</span>
                      <span className="font-bold text-blue-800">{scanResults.points}</span>
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        +25 from last shift
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto mb-6 pr-2">
                    <h3 className="font-medium text-lg mb-3">5S Principle Scores:</h3>
                    <div className="space-y-3 mb-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">1. Sort</span>
                          <span className="font-medium">{scanResults.areas.sort}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full">
                          <div className="h-2.5 rounded-full bg-green-500" style={{width: `${scanResults.areas.sort}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">2. Set in Order</span>
                          <span className="font-medium">{scanResults.areas.set}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full">
                          <div className="h-2.5 rounded-full bg-green-500" style={{width: `${scanResults.areas.set}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">3. Shine</span>
                          <span className="font-medium">{scanResults.areas.shine}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full">
                          <div className="h-2.5 rounded-full bg-yellow-500" style={{width: `${scanResults.areas.shine}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">4. Standardize</span>
                          <span className="font-medium">{scanResults.areas.standardize}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full">
                          <div className="h-2.5 rounded-full bg-green-500" style={{width: `${scanResults.areas.standardize}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">5. Sustain</span>
                          <span className="font-medium">{scanResults.areas.sustain}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full">
                          <div className="h-2.5 rounded-full bg-green-500" style={{width: `${scanResults.areas.sustain}%`}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-yellow-800 mb-2">Insights & Recommendations</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {scanResults.insights.map((insight, index) => (
                          <li key={index} className="flex">
                            <span className="mr-2">{index === 0 ? '🏆' : index === 1 ? '⚠️' : '🔍'}</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => {resetScan(); setShowShiftScanModal(false);}}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md font-medium"
                    >
                      Close
                    </button>
                    <button 
                      onClick={() => setShowSubmitFeedback(true)}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Submit to Team Dashboard
                    </button>
                  </div>
                </div>
              )}
              
              {/* Feedback after submission */}
              {showSubmitFeedback && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 p-6 rounded-lg">
                  <div className="bg-green-100 rounded-full p-4 mb-4">
                    <ThumbsUp size={48} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Successfully Submitted!</h3>
                  <p className="text-center text-gray-700 mb-4">
                    Your end-of-shift compliance report has been submitted to the team dashboard.
                    The team leads will review your results.
                  </p>
                  <div className="bg-white rounded-lg shadow-md p-4 mb-6 max-w-md w-full">
                    <div className="flex items-center mb-3">
                      <Bell size={20} className="text-blue-600 mr-2" />
                      <h4 className="font-medium">You've earned badges!</h4>
                    </div>
                    <div className="flex space-x-2 mb-4 justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mx-auto mb-1">
                          <CheckCircle size={28} className="text-white" />
                        </div>
                        <span className="text-xs">Standardization<br/>Master</span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-1">
                          <Award size={28} className="text-white" />
                        </div>
                        <span className="text-xs">5S<br/>Champion</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">Your shift score has been added to Pharmacy Team A's total!</p>
                  </div>
                  <button 
                    onClick={() => {resetScan(); setShowShiftScanModal(false); setShowSubmitFeedback(false);}}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ metrics, onOpenShiftScan }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">5S Performance Dashboard</h2>
        <button 
          onClick={onOpenShiftScan}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Clock size={18} className="mr-2" />
          End-of-Shift Scan
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Inventory Accuracy</h3>
            <span className="text-blue-600"><BarChart2 size={20} /></span>
          </div>
          <div className="flex items-end">
            <span className={`text-3xl font-bold ${metrics.accuracyRate > 90 ? 'text-green-600' : 'text-orange-500'}`}>
              {metrics.accuracyRate}%
            </span>
            <span className="text-gray-500 ml-2 mb-1">/ {metrics.targetAccuracy}% Target</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div className={`h-2.5 rounded-full ${metrics.accuracyRate > 90 ? 'bg-green-600' : 'bg-orange-500'}`} 
                 style={{ width: `${Math.min(100, metrics.accuracyRate)}%` }}>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Stockout Rate</h3>
            <span className="text-blue-600"><Tag size={20} /></span>
          </div>
          <div className="flex items-end">
            <span className={`text-3xl font-bold ${metrics.stockoutRate < 5 ? 'text-green-600' : 'text-red-500'}`}>
              {metrics.stockoutRate}%
            </span>
            <span className="text-gray-500 ml-2 mb-1">/ 2% Target</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div className={`h-2.5 rounded-full ${metrics.stockoutRate < 5 ? 'bg-green-600' : 'bg-red-500'}`} 
                 style={{ width: `${Math.min(100, metrics.stockoutRate * 5)}%` }}>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Time Spent Searching</h3>
            <span className="text-blue-600"><CheckCircle size={20} /></span>
          </div>
          <div className="flex items-end">
            <span className={`text-3xl font-bold ${metrics.timeSpentSearching < 2 ? 'text-green-600' : 'text-red-500'}`}>
              {metrics.timeSpentSearching}
            </span>
            <span className="text-gray-500 ml-2 mb-1">minutes avg / item</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div className={`h-2.5 rounded-full ${metrics.timeSpentSearching < 2 ? 'bg-green-600' : 'bg-red-500'}`} 
                 style={{ width: `${Math.min(100, metrics.timeSpentSearching * 20)}%` }}>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">New Digital 5S Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Camera size={24} className="text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800 text-lg">Shelf Scanning</h4>
                <p className="text-sm text-gray-600">Use smartphone cameras to identify organizational inconsistencies</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mb-3">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Instantly identify misplaced or low stock items</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Get real-time feedback on shelf organization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Receive automated corrective action suggestions</span>
              </li>
            </ul>
            <div className="text-xs text-gray-500 italic mb-2">
              Simulation available via "Scan Shelves" button in header
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50 border-green-200">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Clock size={24} className="text-green-700" />
              </div>
              <div>
                <h4 className="font-medium text-green-800 text-lg">End-of-Shift Compliance</h4>
                <p className="text-sm text-gray-600">Verify 5S standards and earn points for consistency</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mb-3">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Complete comprehensive workplace scans in under 2 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Receive detailed compliance scores across all 5S principles</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Earn points and badges for consistent organization</span>
              </li>
            </ul>
            <div className="text-xs text-gray-500 italic mb-2">
              Simulation available via "End-of-Shift Scan" button on this page
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">5S Implementation Progress</h3>
          <div className="space-y-4">
            {[
              { name: "Sort", progress: 85, status: "Implemented" },
              { name: "Set in Order", progress: 65, status: "In Progress" },
              { name: "Shine", progress: 40, status: "In Progress" },
              { name: "Standardize", progress: 25, status: "Planning" },
              { name: "Sustain", progress: 10, status: "Planning" }
            ].map((s, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{index + 1}. {s.name}</span>
                  <span className="text-sm text-gray-500">{s.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${s.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "End-of-shift scan completed", time: "1 hour ago", user: "J. Thompson", score: "87%" },
              { action: "Shelf scan identified 4 issues", time: "3 hours ago", user: "Anna K.", score: "82%" },
              { action: "Inventory reconciliation completed", time: "4 hours ago", user: "Warehouse Team", score: null },
              { action: "New RFID tags applied to refrigerated items", time: "Yesterday", user: "Pharmacy Staff", score: null },
              { action: "Weekly 5S audit completed", time: "2 days ago", user: "Operations Manager", score: "76%" }
            ].map((activity, index) => (
              <div key={index} className="flex">
                <div className="mr-3 mt-1">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{activity.action}</p>
                    {activity.score && (
                      <span className="text-sm font-medium text-blue-600">Score: {activity.score}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{activity.time} by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sort Component
const Sort = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">1. Sort (Seiri) - Digital Classification</h2>
      <p className="mb-4">The Sort principle focuses on separating necessary from unnecessary items. Our digital classification system helps identify items based on usage frequency and importance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-blue-200 rounded-md p-4 bg-blue-50">
          <h3 className="font-semibold text-lg mb-3">Digital Inventory Classification</h3>
          <div className="space-y-2">
            <div className="flex items-center p-2 bg-green-100 text-green-800 rounded-md">
              <Tag size={18} className="mr-2" />
              <span>High Usage (45%): Items used daily, kept at point-of-use</span>
            </div>
            <div className="flex items-center p-2 bg-yellow-100 text-yellow-800 rounded-md">
              <Tag size={18} className="mr-2" />
              <span>Medium Usage (30%): Items used weekly, nearby storage</span>
            </div>
            <div className="flex items-center p-2 bg-red-100 text-red-800 rounded-md">
              <Tag size={18} className="mr-2" />
              <span>Low Usage (20%): Items used monthly, central storage</span>
            </div>
            <div className="flex items-center p-2 bg-gray-100 text-gray-800 rounded-md">
              <Tag size={18} className="mr-2" />
              <span>Obsolete (5%): Expired or discontinued items</span>
            </div>
          </div>
        </div>
        
        <div className="border border-red-200 rounded-md p-4 bg-red-50">
          <h3 className="font-semibold text-lg mb-3">RFID-Enabled Red Tag Area</h3>
          <p className="mb-3">Items tagged for review or removal are automatically tracked:</p>
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 bg-white rounded border border-red-200">
              <div>
                <span className="font-medium">Diabetic Test Strips</span>
                <p className="text-sm text-gray-600">Reason: Expired</p>
              </div>
              <button className="bg-white text-red-600 border border-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-50">
                Process
              </button>
            </li>
            <li className="flex justify-between items-center p-2 bg-white rounded border border-red-200">
              <div>
                <span className="font-medium">Discontinued Gauze Pads</span>
                <p className="text-sm text-gray-600">Reason: Obsolete</p>
              </div>
              <button className="bg-white text-red-600 border border-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-50">
                Process
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <Camera size={20} className="text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold">Enhance Sort with Smartphone Scanning</h3>
            <p className="text-sm text-gray-700 mt-1">
              The new shelf scanning feature helps identify items that need to be sorted. When scanning shelves,
              the system automatically flags expired or obsolete items and suggests moving them to the red tag area.
            </p>
            <div className="mt-3 flex items-center text-blue-600 text-sm cursor-pointer">
              <Search size={16} className="mr-1" />
              <span>Try shelf scanning from the header button</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Set in Order Component
const SetInOrder = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">2. Set in Order (Seiton) - Organization</h2>
      <p className="mb-4">The Set in Order principle ensures everything has a designated place and is kept in that place.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">Digital Planogram</h3>
          <div className="border-2 border-gray-300 rounded-lg h-64 relative bg-gray-50 p-3">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 border-r-2 border-b-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <span className="block font-medium">Zone A</span>
                <span className="text-sm text-gray-500">Prescription</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <span className="block font-medium">Zone B</span>
                <span className="text-sm text-gray-500">OTC Medication</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-r-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <span className="block font-medium">Zone C</span>
                <span className="text-sm text-gray-500">Medical Devices</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center">
              <div className="text-center">
                <span className="block font-medium">Zone D</span>
                <span className="text-sm text-gray-500">Supplements</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">Pick-to-Light System</h3>
          <p className="mb-3">LED indicators guide staff to exact product locations:</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Current Pick Task</h4>
            <p className="mb-3">Retrieve: <span className="font-medium">Blood Pressure Monitor</span></p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Building</span>
                <span className="font-medium">Shop Building</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Floor</span>
                <span className="font-medium">First Floor</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Zone</span>
                <span className="font-medium text-green-600">Zone C (Light Activated)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shelf</span>
                <span className="font-medium text-green-600">C2 (Light Activated)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <Camera size={20} className="text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold">Verify Set in Order with Smartphone Scanning</h3>
            <p className="text-sm text-gray-700 mt-1">
              The shelf scanning feature identifies items that are out of place according to the digital planogram.
              When scanning, items highlighted in red are in the wrong location and need to be repositioned.
            </p>
            <div className="mt-3 p-3 border border-gray-200 rounded bg-white">
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Recent Scanning Results:</span> 4 items incorrectly placed in Zone C
              </div>
              <div className="flex justify-between">
                <a href="#" className="text-blue-600 text-sm">View Details</a>
                <span className="text-sm text-gray-500">23 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shine Component
const Shine = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">3. Shine (Seiso) - Cleaning & Maintenance</h2>
      <p className="mb-4">The Shine principle ensures that the workplace is clean and ready for use.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-green-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">Digital Cleaning Checklists</h3>
          <div className="space-y-2">
            {[
              { area: "Shop Floor Zone A", status: "Completed", assignee: "Anna K.", time: "Today, 10:15 AM" },
              { area: "Shop Floor Zone B", status: "Completed", assignee: "Mark T.", time: "Today, 11:30 AM" },
              { area: "Shop Floor Zone C", status: "In Progress", assignee: "Lisa M.", time: "In progress" },
              { area: "Shop Floor Zone D", status: "Scheduled", assignee: "James R.", time: "Due today, 5:00 PM" }
            ].map((task, index) => (
              <div key={index} className="flex justify-between p-2 bg-gray-50 rounded border border-gray-200">
                <div>
                  <span className="font-medium">{task.area}</span>
                  <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === "Completed" ? "bg-green-100 text-green-800" : 
                    task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {task.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">IoT Environmental Monitors</h3>
          <p className="mb-3">Sensors track conditions critical for pharmaceutical storage:</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Temperature</span>
                <span className="text-green-600">20.5°C (Normal)</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 rounded-full bg-green-500" style={{width: '45%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15°C</span>
                <span>25°C</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Humidity</span>
                <span className="text-green-600">45% (Normal)</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 rounded-full bg-green-500" style={{width: '40%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30%</span>
                <span>60%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Dust Level</span>
                <span className="text-yellow-600">37 µg/m³ (Warning)</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 rounded-full bg-yellow-500" style={{width: '65%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 µg/m³</span>
                <span>50 µg/m³</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <div className="p-2 bg-yellow-100 rounded-full mr-3">
            <Camera size={20} className="text-yellow-700" />
          </div>
          <div>
            <h3 className="font-semibold">Enhanced Shine Detection</h3>
            <p className="text-sm text-gray-700 mt-1">
              The smartphone scanning feature can now detect dust, spills, and cleanliness issues during shelf scans.
              Computer vision technology identifies areas that need cleaning attention.
            </p>
            <div className="mt-3 bg-white p-3 rounded-lg border border-gray-200">
              <h4 className="font-medium text-sm">Latest Shine Scan Results</h4>
              <div className="flex justify-between items-center mt-2">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    <span>Dust detected on shelf C4</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span>Fingerprints on display case</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Assign Cleanup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Standardize Component
const Standardize = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">4. Standardize (Seiketsu) - Consistent Procedures</h2>
      <p className="mb-4">The Standardize principle ensures that the best practices are consistently applied.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">Digital Work Instructions</h3>
          <div className="space-y-3">
            {[
              { name: "Morning Inventory Check", category: "Daily Operations", status: "Active" },
              { name: "Scanner Calibration Procedure", category: "Equipment Maintenance", status: "Active" },
              { name: "Stock Transfer Process", category: "Inventory Management", status: "Under Review" }
            ].map((procedure, index) => (
              <div key={index} className="p-3 border rounded-md border-gray-200 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{procedure.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    procedure.status === "Active" ? "bg-green-100 text-green-800" : 
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {procedure.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {procedure.category}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">Standard Operating Procedure</h3>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-lg mb-2">Scanner Calibration Procedure</h4>
            <div className="space-y-3 mt-4">
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <div className="w-1/3 bg-gray-100 p-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <h5 className="font-medium mb-1">Preparation</h5>
                  <p className="text-gray-700">Ensure scanner is fully charged and clean from dust.</p>
                </div>
              </div>
              
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <div className="w-1/3 bg-gray-100 p-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">2</span>
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <h5 className="font-medium mb-1">Power On</h5>
                  <p className="text-gray-700">Hold the power button for 3 seconds until the green light appears.</p>
                </div>
              </div>
              
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <div className="w-1/3 bg-gray-100 p-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">3</span>
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <h5 className="font-medium mb-1">Scan Calibration Card</h5>
                  <p className="text-gray-700">Use the provided calibration card and scan when prompted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start">
          <div className="p-2 bg-green-100 rounded-full mr-3">
            <Camera size={20} className="text-green-700" />
          </div>
          <div>
            <h3 className="font-semibold">Standardization Verification</h3>
            <p className="text-sm text-gray-700 mt-1">
              The end-of-shift scanning feature verifies that standardization protocols are being followed.
              The system checks for consistent product placement, label orientation, and adherence to visual management standards.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="p-3 border border-gray-200 rounded bg-white">
                <div className="flex items-center mb-2">
                  <ArrowUp size={16} className="text-green-600 mr-1" />
                  <span className="font-medium text-sm">Best Practice Area</span>
                </div>
                <p className="text-xs text-gray-600">Zone C - Medical Devices achieved a 95% standardization score in today's shift scan</p>
              </div>
              <div className="p-3 border border-gray-200 rounded bg-white">
                <div className="flex items-center mb-2">
                  <AlertCircle size={16} className="text-yellow-600 mr-1" />
                  <span className="font-medium text-sm">Improvement Needed</span>
                </div>
                <p className="text-xs text-gray-600">Zone B - OTC Medications needs better label alignment (76% score)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sustain Component
const Sustain = ({ onOpenShiftScan }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">5. Sustain (Shitsuke) - Maintaining Discipline</h2>
        <button 
          onClick={onOpenShiftScan}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Clock size={18} className="mr-2" />
          End-of-Shift Scan
        </button>
      </div>
      <p className="mb-4">The Sustain principle ensures long-term commitment to 5S through regular audits and continuous improvement.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">5S Audit Application</h3>
          <div className="space-y-2">
            {[
              { date: "Apr 15, 2025", type: "Weekly 5S Audit", score: 82 },
              { date: "Apr 8, 2025", type: "Weekly 5S Audit", score: 78 },
              { date: "Apr 1, 2025", type: "Weekly 5S Audit", score: 75 }
            ].map((audit, index) => (
              <div key={index} className="p-3 border rounded-md border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{audit.date}</h4>
                  <span className={`font-bold ${
                    audit.score >= 80 ? "text-green-600" : 
                    audit.score >= 70 ? "text-yellow-600" : 
                    "text-red-600"
                  }`}>
                    {audit.score}%
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {audit.type}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Audit Score Trend</h4>
            <div className="h-32 w-full bg-gray-50 rounded-md border border-gray-200 p-2 relative">
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-around px-2 pb-2">
                <div className="w-8 bg-blue-500" style={{height: '65%'}}></div>
                <div className="w-8 bg-blue-500" style={{height: '70%'}}></div>
                <div className="w-8 bg-blue-500" style={{height: '75%'}}></div>
                <div className="w-8 bg-blue-500" style={{height: '78%'}}></div>
                <div className="w-8 bg-blue-500" style={{height: '82%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-blue-200 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3">Gamification & Recognition</h3>
          <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
            <h4 className="font-medium mb-3">5S Champions Leaderboard</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <Award size={16} className="text-yellow-600" />
                  </div>
                  <span>Pharmacy Team A</span>
                </div>
                <span className="font-bold">95 points</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <Award size={16} className="text-gray-600" />
                  </div>
                  <span>Warehouse Team</span>
                </div>
                <span className="font-bold">82 points</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                    <Award size={16} className="text-orange-600" />
                  </div>
                  <span>Pharmacy Team B</span>
                </div>
                <span className="font-bold">78 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex">
          <div className="p-3 bg-blue-100 rounded-lg mr-4 flex-shrink-0">
            <FileText size={32} className="text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">New End-of-Shift Compliance Scanning</h3>
            <p className="text-gray-700 mt-1 mb-3">
              Our new end-of-shift compliance scanning feature helps sustain 5S practices by making verification quick and engaging.
              Staff can scan their workplace using a smartphone before leaving for the day to:
            </p>
            <ul className="space-y-2 mb-4 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Verify that all 5S principles have been maintained throughout the shift</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Earn points and badges for maintaining organization standards</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Identify any areas needing attention before the next shift begins</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                <span>Track improvement over time with detailed metrics for each 5S principle</span>
              </li>
            </ul>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="flex items-center">
                <Clock size={18} className="text-blue-600 mr-2" />
                <span className="font-medium">Try it now: Click the "End-of-Shift Scan" button to run a simulation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePharma5S;