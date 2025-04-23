import React from 'react';
import './FlowArrow.css';

const FlowArrow = ({ flow, type, nodes, onClick }) => {
  // Find the source and target nodes
  const findNodePosition = (id) => {
    const node = nodes.find(n => n?.id === id);
    if (!node) return null;
    
    // Get node dimensions (approximate based on type)
    let width = 150;
    let height = 80;
    
    if (id.includes('supplier')) {
      width = 120;
      height = 100;
    } else if (id.includes('inventory')) {
      width = 100;
      height = 80;
    }
    
    return { 
      x: node.position.x, 
      y: node.position.y,
      width,
      height
    };
  };

  const fromNode = findNodePosition(flow.from);
  const toNode = findNodePosition(flow.to);

  if (!fromNode || !toNode) {
    return null; // Skip if we can't find positions
  }

  // Calculate the center points of each node
  const fromCenter = { x: fromNode.x + fromNode.width / 2, y: fromNode.y + fromNode.height / 2 };
  const toCenter = { x: toNode.x + toNode.width / 2, y: toNode.y + toNode.height / 2 };

  // Calculate direction vector
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  
  if (length === 0) return null; // Avoid division by zero

  // Normalize direction vector
  const nx = dx / length;
  const ny = dy / length;

  // Calculate intersection points with node boundaries
  // From node
  let fromX, fromY, toX, toY;
  
  // Simple calculation for edge points
  if (Math.abs(nx) > Math.abs(ny)) {
    // Horizontal predominant direction
    fromX = fromCenter.x + (nx > 0 ? fromNode.width / 2 : -fromNode.width / 2);
    fromY = fromCenter.y + ny * Math.abs(fromNode.width / 2 / nx);
    
    toX = toCenter.x + (nx < 0 ? toNode.width / 2 : -toNode.width / 2);
    toY = toCenter.y - ny * Math.abs(toNode.width / 2 / nx);
  } else {
    // Vertical predominant direction
    fromX = fromCenter.x + nx * Math.abs(fromNode.height / 2 / ny);
    fromY = fromCenter.y + (ny > 0 ? fromNode.height / 2 : -fromNode.height / 2);
    
    toX = toCenter.x - nx * Math.abs(toNode.height / 2 / ny);
    toY = toCenter.y + (ny < 0 ? toNode.height / 2 : -toNode.height / 2);
  }

  // Calculate the angle and adjusted length for the arrow
  const actualDx = toX - fromX;
  const actualDy = toY - fromY;
  const actualLength = Math.sqrt(actualDx * actualDx + actualDy * actualDy) - 15; // Subtract a bit to make arrowhead visible
  const angle = Math.atan2(actualDy, actualDx) * (180 / Math.PI);

  const arrowStyle = {
    width: `${actualLength}px`,
    transform: `rotate(${angle}deg)`,
    left: `${fromX}px`,
    top: `${fromY}px`,
    transformOrigin: 'left center',
    position: 'absolute',
    zIndex: 5
  };

  // Create a label position in the middle of the arrow
  const midPoint = {
    x: fromX + actualDx * 0.5,
    y: fromY + actualDy * 0.5
  };
  
  // Offset label perpendicular to the arrow for better visibility
  const perpAngle = angle + 90;
  const perpDistance = type === 'information' ? -20 : 20; // Different offset for different arrow types
  const labelOffset = {
    x: Math.cos(perpAngle * Math.PI / 180) * perpDistance,
    y: Math.sin(perpAngle * Math.PI / 180) * perpDistance
  };
  
  const labelStyle = {
    left: `${midPoint.x + labelOffset.x}px`,
    top: `${midPoint.y + labelOffset.y - 10}px`,
    position: 'absolute',
    zIndex: 6
  };

  const arrowClass = type === 'information' ? 'flow-arrow information-flow' : 'flow-arrow material-flow';

  return (
    <>
      <div 
        className={arrowClass}
        style={arrowStyle}
        onClick={onClick}
        title={flow.details}
      >
        <div className="arrow-head"></div>
      </div>
      <div 
        className="flow-label"
        style={labelStyle}
        onClick={onClick}
      >
        <span>{flow.frequency}</span>
      </div>
    </>
  );
};

export default FlowArrow;