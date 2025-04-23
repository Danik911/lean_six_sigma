import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import './App.css';
import ValueStreamMap from './components/ValueStreamMap';
import { valueStreamData } from './valueStreamData';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [view, setView] = useState('current');
  const [selectedMetric, setSelectedMetric] = useState('time');
  const [selectedNode, setSelectedNode] = useState(null);
  const [showStockTakeSimulation, setShowStockTakeSimulation] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    showSuppliers: true,
    showProcesses: true,
    showInventory: true,
    showInfoFlow: true,
    showMaterialFlow: true,
    showProblemAreas: true,
    showLeanOpportunities: true
  });
  const [timelineRange, setTimelineRange] = useState(7);

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  const handleFilterChange = (filter, value) => {
    setFilterSettings(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const toggleStockTakeSimulation = () => {
    setShowStockTakeSimulation(!showStockTakeSimulation);
  };
  
  // Current date for display
  const currentDate = "April 2025";

  return (
    <div className="App">
      <header className="App-header">
        <h1>SimplePharma Inventory Management</h1>
        <p>Value Stream Mapping - {currentDate}</p>
        <Nav className="justify-content-center">
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
              variant="outline-primary" 
              disabled>
              Ideal State
            </Button>
          </Nav.Item>
          <Nav.Item className="ml-3">
            <Button 
              variant={showStockTakeSimulation ? 'warning' : 'outline-warning'}
              onClick={toggleStockTakeSimulation}>
              {showStockTakeSimulation ? 'Hide Stock Take Simulation' : 'Show Stock Take Simulation'}
            </Button>
          </Nav.Item>
        </Nav>
      </header>

      <Container fluid className="map-container">
        <div className="vsm-wrapper">
          <ValueStreamMap 
            data={valueStreamData} 
            view={view}
            selectedMetric={selectedMetric}
            onNodeSelect={handleNodeSelect}
            showStockTakeSimulation={showStockTakeSimulation}
            filterSettings={filterSettings}
          />
        </div>
      </Container>

      <footer className="App-footer">
        <div className="metrics-summary">
          <Row>
            <Col>
              <div className="bg-info text-white p-2 mb-1">
                Total Lead Time: {valueStreamData.metrics?.currentState?.totalLeadTime || "N/A"} days
              </div>
            </Col>
            <Col>
              <div className="bg-success text-white p-2 mb-1">
                Value-Added: {valueStreamData.metrics?.currentState?.valueAddedPercentage || "N/A"}%
              </div>
            </Col>
            <Col>
              <div className="bg-warning text-white p-2 mb-1">
                Inventory Accuracy: {valueStreamData.metrics?.currentState?.inventoryAccuracy || "N/A"}%
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </div>
  );
}

export default App;
