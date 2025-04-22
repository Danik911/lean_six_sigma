import React from 'react';
import { Card, Form, Row, Col, Badge } from 'react-bootstrap';
import './ControlPanel.css';

function ControlPanel({
  selectedMetric,
  onMetricChange,
  filterSettings,
  onFilterChange,
  whatIfSettings,
  onWhatIfChange,
  timelineRange,
  onTimelineRangeChange
}) {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>Control Panel</span>
        <Badge bg="info">What-If Analysis Active</Badge>
      </Card.Header>
      <Card.Body>
        {/* Metric Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Select Metric</Form.Label>
          <Form.Select value={selectedMetric} onChange={(e) => onMetricChange(e.target.value)}>
            <option value="time">Time</option>
            <option value="cost">Cost</option>
            <option value="quality">Quality</option>
            <option value="leadTime">Lead Time</option>
            <option value="accuracy">Order Accuracy</option>
          </Form.Select>
        </Form.Group>

        {/* Filters */}
        <Form.Group className="mb-3">
          <Form.Label>Filters</Form.Label>
          {/* Existing filters */}
          {Object.keys(filterSettings || {}) // Add fallback {} here
            .filter(key => !['showMedDev', 'showDrugSeek', 'showVitaFast'].includes(key)) 
            .map(key => (
            <Form.Check
              key={key}
              type="switch"
              id={`filter-${key}`}
              label={`Show ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
              checked={filterSettings[key]}
              onChange={(e) => onFilterChange(key, e.target.checked)}
            />
          ))}
          
          {/* Supplier-specific filters */}
          <div className="mt-2">
            <Form.Label>Suppliers:</Form.Label>
            <div className="d-flex flex-wrap">
              <Form.Check 
                className="me-3"
                type="checkbox"
                id="show-meddev"
                label="MedDev"
                checked={filterSettings?.showMedDev}
                onChange={(e) => onFilterChange('showMedDev', e.target.checked)}
              />
              <Form.Check 
                className="me-3"
                type="checkbox"
                id="show-drugseek"
                label="DrugSeek"
                checked={filterSettings?.showDrugSeek}
                onChange={(e) => onFilterChange('showDrugSeek', e.target.checked)}
              />
              <Form.Check 
                className="me-3"
                type="checkbox"
                id="show-vitafast"
                label="VitaFast"
                checked={filterSettings?.showVitaFast}
                onChange={(e) => onFilterChange('showVitaFast', e.target.checked)}
              />
            </div>
          </div>
        </Form.Group>

        {/* What-If Analysis - Enhanced for suppliers and ordering */}
        <Form.Group className="mb-3 what-if-section">
          <Form.Label className="what-if-header">What-If Analysis:</Form.Label>
          
          {/* Staff Training (existing) */}
          <Row className="mb-2">
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
          
          {/* Order System Type */}
          <Row className="mb-2">
            <Col sm={8}>
              <Form.Label>Order System:</Form.Label>
            </Col>
            <Col sm={4}>
              <Form.Select 
                size="sm"
                value={whatIfSettings?.orderSystem}
                onChange={(e) => onWhatIfChange('orderSystem', e.target.value)}
              >
                <option value="manual">Manual</option>
                <option value="semiAuto">Semi-Auto</option>
                <option value="automated">Automated</option>
                <option value="aiPowered">AI-Powered</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="mt-1 mb-2 small text-muted">
            <strong>Impact:</strong> AI-powered system improves order accuracy by 7% (to 99%) and reduces processing time by 85%
          </div>
          
          {/* Supplier Integration */}
          <Row className="mb-2">
            <Col sm={8}>
              <Form.Label>Supplier Integration:</Form.Label>
            </Col>
            <Col sm={4}>
              <Form.Select 
                size="sm"
                value={whatIfSettings?.supplierIntegration}
                onChange={(e) => onWhatIfChange('supplierIntegration', e.target.value)}
              >
                <option value="none">None</option>
                <option value="basic">Email</option>
                <option value="erp">ERP</option>
                <option value="api">API</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="mt-1 mb-2 small text-muted">
            <strong>Impact:</strong> API integration decreases lead time by 40% and eliminates 95% of communication inefficiencies
          </div>
          
          {/* Count Method (existing - modified) */}
          <Row className="mb-2">
            <Col sm={8}>
              <Form.Label>Inventory Tracking:</Form.Label>
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
          
          {/* Results Section */}
          <div className="mt-3 what-if-results">
            <h6>Estimated Impact of Changes:</h6>
            <Row className="mb-2">
              <Col>
                <Badge bg="success" className="w-100 p-2">
                  Order Accuracy: 
                  {whatIfSettings?.orderSystem === 'aiPowered' ? '99%' : 
                   whatIfSettings?.orderSystem === 'automated' ? '97%' :
                   whatIfSettings?.orderSystem === 'semiAuto' ? '94%' : '92%'}
                </Badge>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Badge bg="info" className="w-100 p-2">
                  Order Processing: 
                  {whatIfSettings?.orderSystem === 'aiPowered' ? '18 min' : 
                   whatIfSettings?.orderSystem === 'automated' ? '45 min' :
                   whatIfSettings?.orderSystem === 'semiAuto' ? '80 min' : '120 min'}
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col>
                <Badge bg="warning" className="w-100 p-2">
                  Avg. Lead Time: 
                  {whatIfSettings?.supplierIntegration === 'api' ? '0.7 days' : 
                   whatIfSettings?.supplierIntegration === 'erp' ? '1.0 days' :
                   whatIfSettings?.supplierIntegration === 'basic' ? '1.3 days' : '1.7 days'}
                </Badge>
              </Col>
            </Row>
          </div>
        </Form.Group>

        {/* Timeline Range */}
        <Form.Group className="mb-3">
          <Form.Label>Timeline Range (Days): {timelineRange}</Form.Label>
          <Form.Range
            min="1"
            max="30"
            value={timelineRange}
            onChange={(e) => onTimelineRangeChange(Number(e.target.value))}
          />
          <div className="d-flex justify-content-between">
            <small>1 Day</small>
            <small>30 Days</small>
          </div>
        </Form.Group>

        {/* Supplier Metrics Summary */}
        <Card className="mt-3 mb-3 supplier-metrics">
          <Card.Header className="py-2">Supplier Performance</Card.Header>
          <Card.Body className="p-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="small">MedDev:</span>
              <Badge bg="success">On-Time: 97%</Badge>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="small">DrugSeek:</span>
              <Badge bg="warning">On-Time: 89%</Badge>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="small">VitaFast:</span>
              <Badge bg="info">On-Time: 92%</Badge>
            </div>
          </Card.Body>
        </Card>
        
      </Card.Body>
    </Card>
  );
}

export default ControlPanel;
