import React from 'react';
import { Modal, Table, Badge, ProgressBar } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const ProcessDetailModal = ({ process, show, onHide }) => {
  if (!process) return null;
  
  const valueAddedPercent = Math.round((process.valueAddedTime / process.cycleTime) * 100);
  const nonValueAddedPercent = 100 - valueAddedPercent;
  
  // Prepare data for pie chart
  const pieData = [
    ['Activity Type', 'Minutes'],
    ['Value Added', process.valueAddedTime],
    ['Non-Value Added', process.nonValueAddedTime],
  ];
  
  // Prepare data for bar chart of process steps (if available)
  const stepData = process.steps ? [
    ['Step', 'Minutes', { role: 'style' }],
    ...process.steps.map(step => [
      step.name,
      step.time,
      step.accuracy ? (step.accuracy > 90 ? '#28a745' : step.accuracy > 75 ? '#ffc107' : '#dc3545') : '#17a2b8'
    ])
  ] : null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{process.name} - Detailed Analysis</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="process-overview mb-4">
          <h5>Process Overview</h5>
          <p>{process.details}</p>
          
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong>Cycle Time:</strong> {process.cycleTime} minutes
            </div>
            <div>
              <strong>Staff:</strong> {process.staff} people
            </div>
          </div>
          
          <h6>Value Added Analysis</h6>
          <div className="d-flex align-items-center mb-2">
            <span className="me-2">Value-Added: {process.valueAddedTime} min ({valueAddedPercent}%)</span>
            <Badge bg={valueAddedPercent > 75 ? "success" : valueAddedPercent > 50 ? "warning" : "danger"}>
              {valueAddedPercent}%
            </Badge>
          </div>
          <ProgressBar className="mb-3">
            <ProgressBar variant="success" now={valueAddedPercent} key={1} />
            <ProgressBar variant="danger" now={nonValueAddedPercent} key={2} />
          </ProgressBar>
        </div>
        
        {process.steps && (
          <div className="process-steps mb-4">
            <h5>Process Steps</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Step Name</th>
                  <th>Time (min)</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {process.steps.map((step, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{step.name}</td>
                    <td>{step.time}</td>
                    <td>
                      {step.accuracy && <div>Accuracy: {step.accuracy}%</div>}
                      {step.frequency && <div>Frequency: {step.frequency}</div>}
                      {step.range && <div>Range: {step.range}</div>}
                      {step.scanners && <div>Scanners: {step.scanners} (Utilization: {step.utilization}%)</div>}
                      {step.problemRate && <div>Problem Rate: {step.problemRate}%</div>}
                      {step.impact && <div>Impact: {step.impact}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td><strong>{process.steps.reduce((sum, step) => sum + step.time, 0)} min</strong></td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          </div>
        )}
        
        <div className="process-charts">
          <div className="row">
            <div className="col-md-6">
              <h5>Value Distribution</h5>
              <Chart
                chartType="PieChart"
                width="100%"
                height="200px"
                data={pieData}
                options={{
                  title: 'Value vs. Non-Value Added Time',
                  slices: {
                    0: { color: '#28a745' },
                    1: { color: '#dc3545' }
                  }
                }}
              />
            </div>
            {stepData && (
              <div className="col-md-6">
                <h5>Step Timing Breakdown</h5>
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="200px"
                  data={stepData}
                  options={{
                    title: 'Process Step Times',
                    legend: { position: 'none' },
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="process-waste-analysis mt-4">
          <h5>Waste Analysis</h5>
          <p>Non-value added activities in this process contribute to {process.nonValueAddedTime} minutes of waste.</p>
          <p>Potential improvement areas:</p>
          <ul>
            {process.id === "process-stock-take" && (
              <>
                <li>Implement RFID technology to eliminate manual counting (85% time reduction)</li>
                <li>Standardize training to improve count accuracy from {process.steps.find(s => s.name.includes("counting"))?.accuracy || 0}% to 95%</li>
                <li>Increase scanner utilization from {process.steps.find(s => s.name.includes("Scanning"))?.utilization || 0}% to 95%</li>
              </>
            )}
            {process.id === "process-receiving" && (
              <>
                <li>Implement barcode scanning to improve count accuracy (currently {process.steps.find(s => s.name.includes("Count"))?.accuracy || 0}%)</li>
                <li>Streamline verification process to reduce time by 30%</li>
              </>
            )}
            {process.id === "process-sales" && (
              <>
                <li>Reduce customer wait time from average {process.steps.find(s => s.name.includes("wait"))?.time || 0} minutes</li>
                <li>Optimize shelf stocking frequency based on demand patterns</li>
              </>
            )}
            {(process.id === "process-internal-dist-medical" || process.id === "process-internal-dist-drugs") && (
              <>
                <li>Implement pull system with kanban cards</li>
                <li>Reduce transport time through layout optimization</li>
                <li>Optimize check frequency to reduce stockouts</li>
              </>
            )}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProcessDetailModal;
