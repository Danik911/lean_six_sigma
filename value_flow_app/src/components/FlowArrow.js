import React from 'react';
import './FlowArrow.css';

const FlowArrow = ({ flow, type, nodes, onClick }) => {
  // Find the source and target nodes
  const findNodePosition = (id) => {
    const node = nodes.find(n => n?.id === id);
    if (!node) return null;
    
    // Get node dimensions (approximate based on type)
    let width = 160; // Default width
    let height = 80;  // Default height
    
    if (id.includes('supplier')) {
      width = 120;
      height = 100;
    } else if (id.includes('inventory')) {
      width = 100;
      height = 80;
    } else if (id.includes('customer')) {
      width = 180;
      height = 120;
    } else if (id.includes('dispatch')) {
      width = 160;
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

  // Adjust connection points for specific node types
  const getConnectionPoint = (node, isFrom, nx, ny) => {
    // Special case for customer at the top
    if (node.id?.includes('customer') && !isFrom) {
      return {
        x: node.x + node.width / 2,
        y: node.y + node.height * 0.8 // Connect to bottom of customer node
      };
    }
    
    // For dispatch, connect closer to the previous element
    if (node.id?.includes('dispatch') && !isFrom) {
      return {
        x: node.x - 5, // Connect to left side of dispatch
        y: node.y + node.height / 2
      };
    }
    
    // For material flows, prefer horizontal connections
    if (Math.abs(nx) > Math.abs(ny) * 1.2) {
      // Horizontal predominant direction
      const x = isFrom ? 
        node.x + (nx > 0 ? node.width : 0) :
        node.x + (nx < 0 ? node.width : 0);
      return {
        x: x,
        y: node.y + node.height / 2
      };
    } else {
      // Vertical predominant direction
      const y = isFrom ?
        node.y + (ny > 0 ? node.height : 0) :
        node.y + (ny < 0 ? node.height : 0);
      return {
        x: node.x + node.width / 2,
        y: y
      };
    }
  };

  // Get actual connection points
  const fromPoint = getConnectionPoint(fromNode, true, nx, ny);
  const toPoint = getConnectionPoint(toNode, false, nx, ny);
  
  // Calculate new direction and length
  const actualDx = toPoint.x - fromPoint.x;
  const actualDy = toPoint.y - fromPoint.y;
  const actualLength = Math.sqrt(actualDx * actualDx + actualDy * actualDy) - 10; // Small offset for arrow head
  const angle = Math.atan2(actualDy, actualDx) * (180 / Math.PI);

  const arrowStyle = {
    width: `${actualLength}px`,
    transform: `rotate(${angle}deg)`,
    left: `${fromPoint.x}px`,
    top: `${fromPoint.y}px`,
    transformOrigin: 'left center',
    position: 'absolute',
    zIndex: 5
  };

  // Create a label position in the middle of the arrow
  const midPoint = {
    x: fromPoint.x + actualDx * 0.5,
    y: fromPoint.y + actualDy * 0.5
  };
  
  // Offset label perpendicular to the arrow for better visibility
  const perpAngle = angle + 90;
  const perpDistance = type === 'information' ? -15 : 15; // Different offset for different arrow types
  const labelOffset = {
    x: Math.cos(perpAngle * Math.PI / 180) * perpDistance,
    y: Math.sin(perpAngle * Math.PI / 180) * perpDistance
  };
  
  const labelStyle = {
    left: `${midPoint.x + labelOffset.x}px`,
    top: `${midPoint.y + labelOffset.y - 8}px`, // Adjusted vertical position
    position: 'absolute',
    zIndex: 6
  };

  // Determine arrow class based on flow type
  let arrowClass = 'flow-arrow';
  if (type === 'information') {
    arrowClass += ' information-flow';
  } else {
    arrowClass += flow.type === 'push' ? ' material-flow push-flow' : ' material-flow pull-flow';
  }

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