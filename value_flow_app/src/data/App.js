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

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  const toggleView = () => {
    setView(view === 'current' ? 'future' : 'current');
  };

  const toggleStockTakeSimulation = () => {
    setShowStockTakeSimulation(!showStockTakeSimulation);
  };

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
              />
            </div>
          </Col>
          <Col md={3}>
            <ControlPanel 
              selectedMetric={selectedMetric} 
              onMetricChange={handleMetricChange} 
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
              <Badge bg="warning">Inventory Accuracy: {valueStreamData.metrics.inventoryAccuracy}%</Badge>
            </Col>
          </Row>
        </div>
      </footer>
    </div>
  );
}

export default App;
