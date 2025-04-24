import React from 'react';
import './FlowArrow.css';

const FlowArrow = ({ flow, type, nodes, onClick }) => {
  // Find the source and target nodes
  const findNodePosition = (id) => {
    const node = nodes.find(n => n?.id === id);
    if (!node) return null;
    
    // Get node dimensions (more accurate based on node type)
    let width = 160; // Default width
    let height = 80;  // Default height
    
    if (id.includes('supplier')) {
      width = 160;
      height = 120;
    } else if (id.includes('inventory')) {
      width = 150;
      height = 100;
    } else if (id.includes('customer')) {
      width = 180;
      height = 120;
    } else if (id.includes('process')) {
      width = 170;
      height = 100;
    }
    
    return { 
      id,
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

  // Adjust connection points for specific node types and flow direction
  const getConnectionPoint = (node, isFrom, nx, ny) => {
    // Handle specific node types
    if (node.id?.includes('customer')) {
      if (!isFrom) {
        // Connect to left side of customer node
        return {
          x: node.x,
          y: node.y + node.height / 2
        };
      }
    }
    
    // For inventory nodes, adjust connection points based on shape
    if (node.id?.includes('inventory')) {
      if (isFrom) {
        // From inventory, connect from the right side if flowing right
        if (nx > 0) {
          return {
            x: node.x + node.width,
            y: node.y + node.height / 2
          };
        }
        // From inventory, connect from the bottom if flowing down
        else if (ny > 0) {
          return {
            x: node.x + node.width / 2,
            y: node.y + node.height
          };
        }
      } else {
        // To inventory, connect to the left side if flowing from left
        if (nx > 0) {
          return {
            x: node.x,
            y: node.y + node.height / 2
          };
        }
        // To inventory, connect to the top if flowing from above
        else if (ny > 0) {
          return {
            x: node.x + node.width / 2,
            y: node.y
          };
        }
      }
    }
    
    // For process nodes, adjust based on flow direction
    if (node.id?.includes('process')) {
      // Determine the best side based on flow direction
      if (Math.abs(nx) > Math.abs(ny)) {
        // Horizontal flow is dominant
        const xPoint = isFrom ? 
          (nx > 0 ? node.x + node.width : node.x) :
          (nx > 0 ? node.x : node.x + node.width);
        return {
          x: xPoint,
          y: node.y + node.height / 2
        };
      } else {
        // Vertical flow is dominant
        const yPoint = isFrom ?
          (ny > 0 ? node.y + node.height : node.y) :
          (ny > 0 ? node.y : node.y + node.height);
        return {
          x: node.x + node.width / 2,
          y: yPoint
        };
      }
    }
    
    // Default case - determine connection point based on direction vector
    if (Math.abs(nx) > Math.abs(ny)) {
      // Horizontal predominant direction
      const x = isFrom ? 
        (nx > 0 ? node.x + node.width : node.x) :
        (nx > 0 ? node.x : node.x + node.width);
      return {
        x: x,
        y: node.y + node.height / 2
      };
    } else {
      // Vertical predominant direction
      const y = isFrom ?
        (ny > 0 ? node.y + node.height : node.y) :
        (ny > 0 ? node.y : node.y + node.height);
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
  const actualLength = Math.sqrt(actualDx * actualDx + actualDy * actualDy) - 12; // Offset for arrow head
  const angle = Math.atan2(actualDy, actualDx) * (180 / Math.PI);

  const arrowStyle = {
    width: `${actualLength}px`,
    transform: `rotate(${angle}deg)`,
    left: `${fromPoint.x}px`,
    top: `${fromPoint.y}px`,
    transformOrigin: 'left center',
    position: 'absolute',
    zIndex: flow.from.includes('production') || flow.to.includes('production') ? 11 : 5
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