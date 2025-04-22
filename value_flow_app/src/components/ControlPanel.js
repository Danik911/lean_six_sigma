import React from 'react';
import { Card, Form } from 'react-bootstrap';

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
      <Card.Header>Control Panel</Card.Header>
      <Card.Body>
        {/* Metric Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Select Metric</Form.Label>
          <Form.Select value={selectedMetric} onChange={(e) => onMetricChange(e.target.value)}>
            <option value="time">Time</option>
            <option value="cost">Cost</option>
            <option value="quality">Quality</option>
            {/* Add other relevant metrics */}
          </Form.Select>
        </Form.Group>

        {/* Filters */}
        <Form.Group className="mb-3">
          <Form.Label>Filters</Form.Label>
          {Object.keys(filterSettings).map(key => (
            <Form.Check
              key={key}
              type="switch"
              id={`filter-${key}`}
              label={`Show ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
              checked={filterSettings[key]}
              onChange={(e) => onFilterChange(key, e.target.checked)}
            />
          ))}
        </Form.Group>

        {/* What-If Analysis */}
        <Form.Group className="mb-3">
          <Form.Label>What-If Analysis</Form.Label>
          {/* Example: Training Level */}
          <Form.Label>Staff Training</Form.Label>
           <Form.Select value={whatIfSettings.trainingLevel} onChange={(e) => onWhatIfChange('trainingLevel', e.target.value)}>
             <option value="basic">Basic</option>
             <option value="intermediate">Intermediate</option>
             <option value="advanced">Advanced</option>
           </Form.Select>
           {/* Add controls for other what-if settings like scannerModel, countMethod */}
        </Form.Group>

        {/* Timeline Range */}
        <Form.Group className="mb-3">
          <Form.Label>Timeline Range (Days): {timelineRange}</Form.Label>
          <Form.Range
            min="1"
            max="30" // Adjust max as needed
            value={timelineRange}
            onChange={(e) => onTimelineRangeChange(Number(e.target.value))}
          />
        </Form.Group>

      </Card.Body>
    </Card>
  );
}

export default ControlPanel;
