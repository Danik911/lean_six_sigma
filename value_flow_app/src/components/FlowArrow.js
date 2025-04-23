import React from 'react';
import './FlowArrow.css';

const FlowArrow = ({ flow, type, nodes, onClick }) => {
  // Find the source and target nodes
  const findNodePosition = (id) => {
    const node = nodes.find(n => n?.id === id);
    return node ? node.position : null;
  };

  const fromPosition = findNodePosition(flow.from);
  const toPosition = findNodePosition(flow.to);

  if (!fromPosition || !toPosition) {
    return null; // Skip if we can't find positions
  }

  // Add offset to connect to node edges instead of centers
  const offsetFromPos = { x: fromPosition.x, y: fromPosition.y };
  const offsetToPos = { x: toPosition.x, y: toPosition.y };

  // Calculate the angle and length of the arrow
  const dx = offsetToPos.x - offsetFromPos.x;
  const dy = offsetToPos.y - offsetFromPos.y;
  const length = Math.sqrt(dx * dx + dy * dy) - 20; // Subtract 20px to avoid overlapping with nodes
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Create a line with appropriate styling
  const arrowStyle = {
    width: `${length}px`,
    transform: `rotate(${angle}deg)`,
    left: `${offsetFromPos.x + 10}px`, // Add small offset
    top: `${offsetFromPos.y}px`,
    transformOrigin: 'left center',
  };

  // Create a label position - use a formula that keeps it away from nodes
  const midPoint = {
    x: offsetFromPos.x + dx * 0.5,
    y: offsetFromPos.y + dy * 0.5
  };
  
  // Offset label perpendicular to the arrow
  const perpAngle = angle + 90;
  const perpDistance = 20; // Distance perpendicular to arrow
  const labelOffset = {
    x: Math.cos(perpAngle * Math.PI / 180) * perpDistance,
    y: Math.sin(perpAngle * Math.PI / 180) * perpDistance
  };
  
  const labelStyle = {
    left: `${midPoint.x + labelOffset.x}px`,
    top: `${midPoint.y + labelOffset.y - 15}px`, // Move up a bit
  };

  const arrowClass = type === 'information' ? 'flow-arrow information-flow' : 'flow-arrow material-flow';

  return (
    <>
      <div 
        className={arrowClass}
        style={arrowStyle}
        onClick={onClick}
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