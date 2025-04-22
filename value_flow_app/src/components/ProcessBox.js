import React from 'react';
import { FaCogs, FaDatabase } from 'react-icons/fa';
import './ProcessBox.css';

const ProcessBox = ({ process, isERP = false, onClick }) => {
  const renderProcessTimes = () => {
    if (process.processTimes) {
      return (
        <div className="process-times">
          {process.processTimes.medicalDevices && (
            <p>Medical Devices: {process.processTimes.medicalDevices} hrs</p>
          )}
          {process.processTimes.drugs && (
            <p>Drugs: {process.processTimes.drugs} hrs</p>
          )}
          {process.processTimes.miscellaneous && (
            <p>Miscellaneous: {process.processTimes.miscellaneous} hrs</p>
          )}
        </div>
      );
    }
    return null;
  };

  const icon = isERP ? <FaDatabase size={24} /> : <FaCogs size={24} />;
  const boxClass = isERP ? "process-box erp-process" : "process-box";

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
      </div>
      <div className={boxClass}>
        <h4>{process.name}</h4>
        <div className="process-details">
          {renderProcessTimes()}
          {process.cycleTime && (
            <p>
              <span>Cycle Time:</span> 
              <span>{process.cycleTime.min}-{process.cycleTime.max} hrs</span>
            </p>
          )}
          {process.valueAddedRatio && (
            <p>
              <span>Value-Added:</span>
              <span>{process.valueAddedRatio}%</span>
            </p>
          )}
          {process.resources && process.resources.staff && (
            <p>
              <span>Staff:</span>
              <span>{process.resources.staff.min}-{process.resources.staff.max}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessBox;