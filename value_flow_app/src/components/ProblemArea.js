import React, { useState, useEffect, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../ValueStreamMap.css';

const ProblemArea = ({ problem, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const problemRef = useRef(null);
  
  useEffect(() => {
    // Find the associated process element
    if (problem.process) {
      const processElement = document.getElementById(problem.process);
      if (processElement) {
        const processRect = processElement.getBoundingClientRect();
        const mapContent = document.querySelector('.map-content');
        const mapRect = mapContent ? mapContent.getBoundingClientRect() : { top: 0, left: 0 };
        
        // Calculate position at top-center
        const top = processRect.top - mapRect.top;
        const left = processRect.left - mapRect.left + (processRect.width / 2);
        
        setPosition({ top, left });
      }
    } else if (problem.position.x !== 0 || problem.position.y !== 0) {
      // Fallback to absolute positioning if no process is specified
      setPosition({ top: problem.position.y, left: problem.position.x });
    }
  }, [problem]);
  
  return (
    <div 
      ref={problemRef}
      id={problem.id}
      className="problem-area"
      style={{
        position: 'absolute',
        left: `${position.left}px`,
        top: `${position.top}px`
      }}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <FaExclamationTriangle className="problem-icon" />
      {showTooltip && (
        <div className="problem-tooltip">
          {problem.description}
        </div>
      )}
    </div>
  );
};

export default ProblemArea;
