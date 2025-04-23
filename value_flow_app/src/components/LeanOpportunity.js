import React, { useState, useEffect, useRef } from 'react';
import { FaCogs, FaRecycle, FaSortAmountDown, FaMicrochip } from 'react-icons/fa';
import '../ValueStreamMap.css';

const LeanOpportunity = ({ opportunity, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const opportunityRef = useRef(null);
  
  useEffect(() => {
    // Find the associated process element
    if (opportunity.process) {
      const processElement = document.getElementById(opportunity.process);
      if (processElement) {
        const processRect = processElement.getBoundingClientRect();
        const mapContent = document.querySelector('.map-content');
        const mapRect = mapContent ? mapContent.getBoundingClientRect() : { top: 0, left: 0 };
        
        // Calculate position at top-right corner but slightly to the left
        const top = processRect.top - mapRect.top;
        const left = processRect.left - mapRect.left + processRect.width - 25; // Moved 25px to the left
        
        setPosition({ top, left });
      }
    } else if (opportunity.position.x !== 0 || opportunity.position.y !== 0) {
      // Fallback to absolute positioning if no process is specified
      setPosition({ top: opportunity.position.y, left: opportunity.position.x });
    }
  }, [opportunity]);
  
  // Select icon based on opportunity type
  const getIcon = () => {
    switch(opportunity.type.toLowerCase()) {
      case 'kanban':
        return <FaRecycle className="opportunity-icon" />;
      case '5s':
        return <FaSortAmountDown className="opportunity-icon" />;
      case 'smed':
        return <FaCogs className="opportunity-icon" />;
      case 'automation':
      case 'rfid':
        return <FaMicrochip className="opportunity-icon" />;
      default:
        return <FaCogs className="opportunity-icon" />;
    }
  };
  
  return (
    <div 
      ref={opportunityRef}
      id={opportunity.id}
      className="lean-opportunity"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {getIcon()}
      <span className="opportunity-label">{opportunity.type.toUpperCase()}</span>
      {showTooltip && (
        <div className="opportunity-tooltip">
          {opportunity.description}
        </div>
      )}
    </div>
  );
};

export default LeanOpportunity;
