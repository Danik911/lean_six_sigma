import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button, Badge } from 'react-bootstrap';
import './App.css';
import ValueStreamMap from './components/ValueStreamMap';
import { valueStreamData } from './data/valueStreamData';
import InfoPanel from './components/InfoPanel';
import ControlPanel from './components/ControlPanel';

function App() {
  const [view, setView] = useState('current'); // 'current' or 'future'
  const [selectedMetric, setSelectedMetric] = useState('time');
  const [selectedNode, setSelectedNode] = useState(null);
  const [showStockTakeSimulation, setShowStockTakeSimulation] = useState(false);
  const [timelineRange, setTimelineRange] = useState(10);
  
  // Filter settings
  const [filterSettings, setFilterSettings] = useState({
    showSuppliers: true,
    showProcesses: true,
    showInventory: true,
    showInfoFlow: true,
    showMaterialFlow: true
  });
  
  // What-if analysis settings
  const [whatIfSettings, setWhatIfSettings] = useState({
    trainingLevel: 'intermediate',
    scannerModel: 'currentModel',
    countMethod: 'scanner'
  });

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  const toggleStockTakeSimulation = () => {
    setShowStockTakeSimulation(!showStockTakeSimulation);
  };
  
  const handleFilterChange = (filterKey, value) => {
    setFilterSettings({
      ...filterSettings,
      [filterKey]: value
    });
  };
  
  const handleWhatIfChange = (settingKey, value) => {
    setWhatIfSettings({
      ...whatIfSettings,
      [settingKey]: value
    });
  };
  
  const handleTimelineRangeChange = (value) => {
    setTimelineRange(value);
  };

  const calculateInventoryAccuracy = () => {
    const baseAccuracy = valueStreamData.metrics.inventoryAccuracy;
    
    if (whatIfSettings.countMethod === 'rfid') return 95.0;
    if (whatIfSettings.trainingLevel === 'advanced' && whatIfSettings.scannerModel === 'newModel') return 91.0;
    if (whatIfSettings.trainingLevel === 'advanced') return 87.3;
    if (whatIfSettings.scannerModel === 'newModel') return 85.0;
    if (whatIfSettings.countMethod === 'scanner') return 85.1;
    if (whatIfSettings.countMethod === 'manual') return 62.2;
    if (whatIfSettings.countMethod === 'combined') return 62.4;

    return baseAccuracy; 
  };

  const displayedAccuracy = calculateInventoryAccuracy();

  return (
    <div className="App">
      <header className="App-header">
        <h1>SimplePharma Value Flow Map</h1>
        <p>DMAIC Project Visualization</p>
        <Nav className="justify-content-center mb-4">
          <Nav.Item>
            <Button 
              variant={view === 'current' ? 'primary' : 'outline-primary'} 
              onClick={() => setView('current')}>
              Current State
            </Button>
          </Nav.Item>
          <Nav.Item className="mx-2">
            <Button 
              variant={view === 'future' ? 'primary' : 'outline-primary'} 
              onClick={() => setView('future')}>
              Future State
            </Button>
          </Nav.Item>
          <Nav.Item className="mx-2">
            <Button 
              variant={showStockTakeSimulation ? 'warning' : 'outline-warning'}
              onClick={toggleStockTakeSimulation}>
              {showStockTakeSimulation ? 'Hide Stock Take Simulation' : 'Show Stock Take Simulation'}
            </Button>
          </Nav.Item>
        </Nav>
      </header>

      <Container fluid className="map-container">
        <Row>
          <Col md={9}>
            <div className="vsm-wrapper">
              <ValueStreamMap 
                data={valueStreamData} 
                view={view}
                selectedMetric={selectedMetric}
                onNodeSelect={handleNodeSelect}
                showStockTakeSimulation={showStockTakeSimulation}
                whatIfSettings={whatIfSettings}
                filterSettings={filterSettings}
                timelineRange={timelineRange}
              />
            </div>
          </Col>
          <Col md={3}>
            <ControlPanel 
              selectedMetric={selectedMetric} 
              onMetricChange={handleMetricChange}
              filterSettings={filterSettings}
              onFilterChange={handleFilterChange}
              whatIfSettings={whatIfSettings}
              onWhatIfChange={handleWhatIfChange}
              timelineRange={timelineRange}
              onTimelineRangeChange={handleTimelineRangeChange}
            />
            <InfoPanel 
              selectedNode={selectedNode} 
              data={valueStreamData} 
            />
          </Col>
        </Row>
      </Container>
      
      <footer className="App-footer mt-4">
        <div className="metrics-summary">
          <Row>
            <Col>
              <Badge bg="info">Total Lead Time: {valueStreamData.metrics.totalLeadTime} days</Badge>
            </Col>
            <Col>
              <Badge bg="success">Value-Added: {valueStreamData.metrics.valueAddedPercentage}%</Badge>
            </Col>
            <Col>
              <Badge bg="warning">Inventory Accuracy: {displayedAccuracy.toFixed(1)}%</Badge>
            </Col>
          </Row>
        </div>
      </footer>
    </div>
  );
}

export default App;
