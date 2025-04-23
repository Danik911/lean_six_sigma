import React from 'react';

const ProcessConnections = () => {
  return (
    <>
      {/* Vertical connection from Production Control */}
      <div className="process-connection-line vertical-connection"></div>
      
      {/* Horizontal connections to each element */}
      <div className="process-connection-line horizontal-connection left-connection"></div>
      <div className="process-connection-line horizontal-connection center-connection"></div>
      <div className="process-connection-line horizontal-connection right-connection"></div>
    </>
  );
};

export default ProcessConnections;
