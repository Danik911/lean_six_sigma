import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import './InfoPanel.css';

const InfoPanel = ({ selectedNode, data }) => {
  if (!selectedNode || !data) return (
    <Card className="info-panel">
      <Card.Header>Information Panel</Card.Header>
      <Card.Body>
        <p>Select a node on the map to view details.</p>
      </Card.Body>
    </Card>
  );
  
  // Find the selected node in the data
  let nodeData = null;
  let nodeType = '';
  
  if (selectedNode === 'customer') {
    nodeData = data.customer;
    nodeType = 'customer';
  } else if (selectedNode.startsWith('supplier-')) {
    nodeData = data.suppliers.find(s => s.id === selectedNode);
    nodeType = 'supplier';
  } else if (selectedNode.startsWith('process-')) {
    nodeData = data.processes.find(p => p.id === selectedNode);
    nodeType = 'process';
  } else if (selectedNode.startsWith('inventory-')) {
    nodeData = data.inventoryPoints.find(i => i.id === selectedNode);
    nodeType = 'inventory';
  } else if (selectedNode.startsWith('info-')) {
    nodeData = data.informationFlows.find(f => f.id === selectedNode);
    nodeType = 'infoFlow';
  } else if (selectedNode.startsWith('material-')) {
    nodeData = data.materialFlows.find(f => f.id === selectedNode);
    nodeType = 'materialFlow';
  } else if (selectedNode.startsWith('improvement-')) {
    nodeData = data.improvementOpportunities?.find(i => i.id === selectedNode);
    nodeType = 'improvement';
  }
  
  if (!nodeData) return (
    <Card className="info-panel">
      <Card.Header>Information Panel</Card.Header>
      <Card.Body>
        <p>Node data not found for ID: {selectedNode}</p>
      </Card.Body>
    </Card>
  );
  
  return (
    <Card className="info-panel">
      <Card.Header className={`info-header ${nodeType}-header`}>
        <h5>{nodeData.name}</h5>
        <Badge bg={getNodeBadgeColor(nodeType)}>{nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}</Badge>
      </Card.Header>
      <Card.Body>
        {nodeData.details && <p>{nodeData.details}</p>}
        
        <ListGroup variant="flush">
          {renderNodeDetails(nodeData, nodeType)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

// Helper function to get badge color for node type
const getNodeBadgeColor = (nodeType) => {
  switch(nodeType) {
    case 'supplier': return 'success';
    case 'process': return 'primary';
    case 'inventory': return 'warning';
    case 'infoFlow': return 'info';
    case 'materialFlow': return 'secondary';
    case 'customer': return 'danger';
    case 'improvement': return 'warning';
    default: return 'light';
  }
};

// Helper function to render details based on node type
const renderNodeDetails = (nodeData, nodeType) => {
  switch(nodeType) {
    case 'supplier':
      return (
        <>
          <ListGroup.Item>
            <strong>Products:</strong> {nodeData.productType}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Delivery Frequency:</strong> {nodeData.deliveryFrequency}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Lead Time:</strong> {nodeData.leadTime}
          </ListGroup.Item>
        </>
      );
    
    case 'process':
      return (
        <>
          {nodeData.cycleTime && (
            <ListGroup.Item>
              <strong>Cycle Time:</strong> {nodeData.cycleTime.min}-{nodeData.cycleTime.max} hrs
            </ListGroup.Item>
          )}
          {nodeData.processTime && (
            <ListGroup.Item>
              <strong>Process Time:</strong> {nodeData.processTime} days
            </ListGroup.Item>
          )}
          {nodeData.valueAddedRatio && (
            <ListGroup.Item>
              <strong>Value-Added Ratio:</strong> {nodeData.valueAddedRatio}%
            </ListGroup.Item>
          )}
          {nodeData.resources && nodeData.resources.staff && (
            <ListGroup.Item>
              <strong>Staff:</strong> {nodeData.resources.staff.min}-{nodeData.resources.staff.max} personnel
            </ListGroup.Item>
          )}
        </>
      );
    
    case 'inventory':
      return (
        <>
          <ListGroup.Item>
            <strong>Location:</strong> {nodeData.location}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Average Quantity:</strong> {nodeData.averageQuantity} units
          </ListGroup.Item>
          {nodeData.storageCapacityUtilization && (
            <ListGroup.Item>
              <strong>Capacity Utilization:</strong> {nodeData.storageCapacityUtilization}%
            </ListGroup.Item>
          )}
          {nodeData.stockoutRate && (
            <ListGroup.Item>
              <strong>Stockout Rate:</strong> {nodeData.stockoutRate}%
            </ListGroup.Item>
          )}
          {nodeData.storageTime && (
            <ListGroup.Item>
              <strong>Storage Time:</strong> {nodeData.storageTime} hours
            </ListGroup.Item>
          )}
        </>
      );
    
    case 'infoFlow':
      return (
        <>
          <ListGroup.Item>
            <strong>Flow Type:</strong> {nodeData.type}
          </ListGroup.Item>
          {nodeData.medium && (
            <ListGroup.Item>
              <strong>Medium:</strong> {nodeData.medium}
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <strong>Frequency:</strong> {nodeData.frequency}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>From:</strong> {nodeData.from}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>To:</strong> {nodeData.to}
          </ListGroup.Item>
        </>
      );
    
    case 'materialFlow':
      return (
        <>
          <ListGroup.Item>
            <strong>Flow Type:</strong> {nodeData.type}
          </ListGroup.Item>
          {nodeData.transportMethod && (
            <ListGroup.Item>
              <strong>Transport Method:</strong> {nodeData.transportMethod}
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <strong>From:</strong> {nodeData.from}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>To:</strong> {nodeData.to}
          </ListGroup.Item>
        </>
      );
    
    case 'customer':
      return (
        <>
          <ListGroup.Item>
            <strong>Satisfaction:</strong> {nodeData.satisfaction}%
          </ListGroup.Item>
        </>
      );
    
    case 'improvement':
      return (
        <>
          <ListGroup.Item>
            <strong>Description:</strong> {nodeData.description}
          </ListGroup.Item>
          {nodeData.impactAreas && (
            <ListGroup.Item>
              <strong>Impact Areas:</strong>
              <ul>
                {nodeData.impactAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </ListGroup.Item>
          )}
          {nodeData.estimatedImpact && (
            <ListGroup.Item>
              <strong>Estimated Impact:</strong>
              <ul>
                {Object.entries(nodeData.estimatedImpact).map(([key, value], index) => (
                  <li key={index}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}
                    {typeof value === 'number' && !key.includes('Reduction') && !key.includes('Savings') ? '%' : ''}
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          )}
        </>
      );
    
    default:
      return <ListGroup.Item>No detailed information available.</ListGroup.Item>;
  }
};

export default InfoPanel;
