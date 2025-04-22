import React from 'react';
import { Card, Form, Row, Col, Badge } from 'react-bootstrap';
import './ControlPanel.css';

const ControlPanel = ({ 
  selectedMetric, 
  onMetricChange,
  filterSettings,
  onFilterChange,
  whatIfSettings,
  onWhatIfChange,
  timelineRange,
  onTimelineRangeChange 
}) => {
  return (
    <Card className="control-panel">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>Control Panel</span>
        <Badge bg="info">What-If Analysis Active</Badge>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Display Metric:
            </Form.Label>
            <Col sm={8}>
              <Form.Select 
                value={selectedMetric}
                onChange={(e) => onMetricChange(e.target.value)}
              >
                <option value="time">Time</option>
                <option value="value">Value-Added</option>
                <option value="staff">Staff</option>
                <option value="cost">Cost</option>
              </Form.Select>
            </Col>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Filter Display:</Form.Label>
            <div>
              <Form.Check 
                inline
                type="checkbox"
                id="show-suppliers"
                label="Suppliers"
                checked={filterSettings?.showSuppliers}
                onChange={(e) => onFilterChange('showSuppliers', e.target.checked)}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-processes"
                label="Processes"
                checked={filterSettings?.showProcesses}
                onChange={(e) => onFilterChange('showProcesses', e.target.checked)}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-inventory"
                label="Inventory"
                checked={filterSettings?.showInventory}
                onChange={(e) => onFilterChange('showInventory', e.target.checked)}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-information"
                label="Info Flow"
                checked={filterSettings?.showInfoFlow}
                onChange={(e) => onFilterChange('showInfoFlow', e.target.checked)}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-material"
                label="Material Flow"
                checked={filterSettings?.showMaterialFlow}
                onChange={(e) => onFilterChange('showMaterialFlow', e.target.checked)}
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Timeline View: {timelineRange} days</Form.Label>
            <Form.Range 
              min={1}
              max={14}
              value={timelineRange}
              step={1}
              onChange={(e) => onTimelineRangeChange(parseInt(e.target.value, 10))}
            />
            <div className="d-flex justify-content-between">
              <small>1 Day</small>
              <small>14 Days</small>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3 what-if-section">
            <Form.Label className="what-if-header">What-If Analysis:</Form.Label>
            <Row>
              <Col sm={8}>
                <Form.Label>Staff Training Level:</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Select 
                  size="sm"
                  value={whatIfSettings?.trainingLevel}
                  onChange={(e) => onWhatIfChange('trainingLevel', e.target.value)}
                >
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="mt-1 mb-2 small text-muted">
              <strong>Impact:</strong> Advanced training improves count accuracy by 20% and reduces count time by 20%
            </div>
            
            <Row className="mt-2">
              <Col sm={8}>
                <Form.Label>Scanner Model:</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Select 
                  size="sm"
                  value={whatIfSettings?.scannerModel}
                  onChange={(e) => onWhatIfChange('scannerModel', e.target.value)}
                >
                  <option value="oldModel">Old Model</option>
                  <option value="currentModel">Current Model</option>
                  <option value="newModel">New Model</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="mt-1 mb-2 small text-muted">
              <strong>Impact:</strong> New scanners reduce scan time by 30% and improve accuracy by 10%
            </div>
            
            <Row className="mt-2">
              <Col sm={8}>
                <Form.Label>Count Method:</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Select 
                  size="sm"
                  value={whatIfSettings?.countMethod}
                  onChange={(e) => onWhatIfChange('countMethod', e.target.value)}
                >
                  <option value="manual">Manual Count</option>
                  <option value="scanner">Scanner Count</option>
                  <option value="combined">Combined</option>
                  <option value="rfid">RFID System</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="mt-1 mb-2 small text-muted">
              <strong>Impact:</strong> RFID reduces count time by 85% and improves accuracy to 95%
            </div>
            
            <div className="mt-3 what-if-results">
              <h6>Estimated Impact of Changes:</h6>
              <Row>
                <Col>
                  <Badge bg="success" className="w-100 p-2 mb-1">
                    Inventory Accuracy: 
                    {whatIfSettings?.countMethod === 'rfid' ? '95%' : 
                     whatIfSettings?.trainingLevel === 'advanced' && whatIfSettings?.scannerModel === 'newModel' ? '91%' :
                     whatIfSettings?.trainingLevel === 'advanced' ? '87%' :
                     whatIfSettings?.scannerModel === 'newModel' ? '85%' : '77%'}
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Badge bg="info" className="w-100 p-2 mb-1">
                    Stock Take Time: 
                    {whatIfSettings?.countMethod === 'rfid' ? '1.2 hours' : 
                     whatIfSettings?.trainingLevel === 'advanced' && whatIfSettings?.scannerModel === 'newModel' ? '5.8 hours' :
                     whatIfSettings?.trainingLevel === 'advanced' ? '6.5 hours' :
                     whatIfSettings?.scannerModel === 'newModel' ? '7.0 hours' : '8.1 hours'}
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Badge bg="warning" className="w-100 p-2">
                    Resource Savings: 
                    {whatIfSettings?.countMethod === 'rfid' ? '€6,500/yr' : 
                     whatIfSettings?.trainingLevel === 'advanced' && whatIfSettings?.scannerModel === 'newModel' ? '€3,800/yr' :
                     whatIfSettings?.trainingLevel === 'advanced' ? '€2,500/yr' :
                     whatIfSettings?.scannerModel === 'newModel' ? '€1,700/yr' : '€0/yr'}
                  </Badge>
                </Col>
              </Row>
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ControlPanel;
