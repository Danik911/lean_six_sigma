import React, { useState, useEffect } from 'react';
import { Card, ProgressBar, Button, Table } from 'react-bootstrap';
import './StockTakeSimulation.css';

const StockTakeSimulation = ({ stockTakeData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // 1x speed
  
  // Calculate total process time
  const totalTime = stockTakeData ? 
    stockTakeData.steps.reduce((sum, step) => sum + step.time, 0) : 0;
  
  // Calculate accumulated time at each step
  const stepTimes = stockTakeData ? 
    stockTakeData.steps.map((_, index) => {
      return stockTakeData.steps.slice(0, index + 1).reduce((sum, step) => sum + step.time, 0);
    }) : [];
  
  // Play/pause simulation
  useEffect(() => {
    let intervalId;
    
    if (isPlaying && currentStep < (stockTakeData?.steps.length || 0)) {
      intervalId = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + simulationSpeed;
          
          // Check if we've moved to next step
          if (stockTakeData && stepTimes[currentStep] <= newTime) {
            setCurrentStep(Math.min(currentStep + 1, stockTakeData.steps.length));
          }
          
          // Check if simulation complete
          if (newTime >= totalTime) {
            setIsPlaying(false);
            return totalTime;
          }
          
          return newTime;
        });
      }, 100); // Update every 100ms
    }
    
    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep, simulationSpeed, stockTakeData, stepTimes, totalTime]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setElapsedTime(0);
  };
  
  const handleSpeedChange = (speed) => {
    setSimulationSpeed(speed);
  };
  
  if (!stockTakeData) return <div>Stock take data not found</div>;
  
  const currentStepData = currentStep < stockTakeData.steps.length ? 
    stockTakeData.steps[currentStep] : null;
  
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const calculateProgress = (elapsed) => {
    return (elapsed / totalTime) * 100;
  };
  
  return (
    <Card className="stock-take-simulation">
      <Card.Header className="simulation-header">
        <h5>Stock Take Process Simulation</h5>
        <div className="simulation-controls">
          <Button 
            variant={isPlaying ? "warning" : "success"} 
            size="sm"
            onClick={handlePlayPause}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleReset} 
            className="ms-2"
          >
            Reset
          </Button>
          <div className="speed-controls ms-3">
            <Button 
              variant={simulationSpeed === 0.5 ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => handleSpeedChange(0.5)}
            >
              0.5x
            </Button>
            <Button 
              variant={simulationSpeed === 1 ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => handleSpeedChange(1)}
              className="mx-1"
            >
              1x
            </Button>
            <Button 
              variant={simulationSpeed === 2 ? "primary" : "outline-primary"} 
              size="sm" 
              onClick={() => handleSpeedChange(2)}
            >
              2x
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="simulation-progress">
          <div className="d-flex justify-content-between mb-1">
            <span>Elapsed: {formatTime(Math.floor(elapsedTime))}</span>
            <span>Total: {formatTime(totalTime)}</span>
          </div>
          <ProgressBar 
            now={calculateProgress(elapsedTime)} 
            className="mb-3"
            variant="info"
          />
        </div>
        
        <div className="current-step-info">
          {currentStepData ? (
            <>
              <h6>Current Step: {currentStepData.name}</h6>
              <p>Time required: {currentStepData.time} minutes</p>
              {currentStepData.accuracy && (
                <p>Accuracy: {currentStepData.accuracy}%</p>
              )}
              {currentStepData.impact && (
                <p>Impact: {currentStepData.impact}</p>
              )}
              {currentStepData.scanners && (
                <p>Scanners: {currentStepData.scanners} (Utilization: {currentStepData.utilization}%)</p>
              )}
              {currentStepData.problemRate && (
                <p>Problem rate: {currentStepData.problemRate}%</p>
              )}
            </>
          ) : (
            <p>Simulation complete</p>
          )}
        </div>
        
        <Table striped bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Step</th>
              <th>Time (min)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stockTakeData.steps.map((step, index) => (
              <tr key={index} className={currentStep === index ? "current-step" : ""}>
                <td>{step.name}</td>
                <td>{step.time}</td>
                <td>
                  {index < currentStep ? (
                    <span className="text-success">Completed</span>
                  ) : index === currentStep ? (
                    <span className="text-primary">In Progress</span>
                  ) : (
                    <span className="text-secondary">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <div className="stock-take-metrics mt-3">
          <h6>Stock Take Impact</h6>
          <ul>
            <li>Lost Sales Time: 4 hours (€3,200 revenue impact)</li>
            <li>Resource Hours: 147 person-hours</li>
            <li>Recovery Time: 2 business days</li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StockTakeSimulation;
