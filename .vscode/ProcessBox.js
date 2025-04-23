import React from 'react';
import { FaCogs, FaDatabase, FaExclamationTriangle } from 'react-icons/fa';
import './ProcessBox.css';

const ProcessBox = ({ process, isERP = false, isProblemArea = false, onClick }) => {
  const renderMetrics = () => {
    return (
      <div className="process-metrics">
        {process.cycleTime && (
          <p>
            <span>C/T:</span> 
            <span>{process.cycleTime} min</span>
          </p>
        )}
        {process.changeOverTime !== undefined && (
          <p>
            <span>C/O:</span> 
            <span>{process.changeOverTime} min</span>
          </p>
        )}
        {process.firstPassYield && (
          <p>
            <span>FPY:</span>
            <span>{process.firstPassYield}%</span>
          </p>
        )}
        {process.oeeUtil && (
          <p>
            <span>OEE/Util:</span>
            <span>{process.oeeUtil}%</span>
          </p>
        )}
        {process.staff !== undefined && (
          <p>
            <span>Staff:</span>
            <span>{process.staff}</span>
          </p>
        )}
      </div>
    );
  };

  const icon = isERP ? <FaDatabase size={24} /> : <FaCogs size={24} />;
  const boxClass = isERP 
    ? "process-box erp-process" 
    : isProblemArea 
      ? "process-box problem-process" 
      : "process-box";

  return (
    <div 
      className="process-node"
      style={{
        position: 'absolute',
        left: `${process.position.x}px`,
        top: `${process.position.y}px`,
      }}
      onClick={onClick}
    >
      <div className="process-icon">
        {icon}
        {isProblemArea && (
          <div className="problem-indicator">
            <FaExclamationTriangle size={14} color="#e74c3c" />
          </div>
        )}
      </div>
      <div className={boxClass}>
        <h4>{process.name}</h4>
        <div className="process-details">
          {renderMetrics()}
          {process.details && (
            <p className="process-description">{process.details}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessBox;