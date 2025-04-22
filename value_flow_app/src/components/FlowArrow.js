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

  // Calculate the angle and length of the arrow
  const dx = toPosition.x - fromPosition.x;
  const dy = toPosition.y - fromPosition.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Create a line with appropriate styling
  const arrowStyle = {
    width: `${length}px`,
    transform: `rotate(${angle}deg)`,
    left: `${fromPosition.x}px`,
    top: `${fromPosition.y}px`,
    transformOrigin: 'left center',
  };

  // Create a label position
  const labelStyle = {
    left: `${fromPosition.x + dx / 2}px`,
    top: `${fromPosition.y + dy / 2 - 20}px`,
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