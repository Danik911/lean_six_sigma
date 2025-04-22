import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import './ControlPanel.css';

const ControlPanel = ({ selectedMetric, onMetricChange }) => {
  return (
    <Card className="control-panel">
      <Card.Header>Control Panel</Card.Header>
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
                defaultChecked={true}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-processes"
                label="Processes"
                defaultChecked={true}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-inventory"
                label="Inventory"
                defaultChecked={true}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-information"
                label="Info Flow"
                defaultChecked={true}
              />
              <Form.Check 
                inline
                type="checkbox"
                id="show-material"
                label="Material Flow"
                defaultChecked={true}
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Timeline View:</Form.Label>
            <Form.Range 
              min={1}
              max={14}
              defaultValue={10}
              step={1}
            />
            <div className="d-flex justify-content-between">
              <small>1 Day</small>
              <small>14 Days</small>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>What-If Analysis:</Form.Label>
            <Row>
              <Col sm={8}>
                <Form.Label>Staff Training Level:</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Select size="sm">
                  <option>Basic</option>
                  <option>Intermediate</option>
                  <option selected>Advanced</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={8}>
                <Form.Label>Scanner Model:</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Select size="sm">
                  <option>Old Model</option>
                  <option selected>Current Model</option>
                  <option>New Model</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col sm={8}>
                <Form.Label>Count Method:</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Select size="sm">
                  <option>Manual Count</option>
                  <option selected>Scanner Count</option>
                  <option>Combined</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ControlPanel;
