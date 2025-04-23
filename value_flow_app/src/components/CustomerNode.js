import React from 'react';
import { FaUsers } from 'react-icons/fa';
import './CustomerNode.css';

const CustomerNode = ({ customer, onClick }) => {
  return (
    <div 
      id={customer.id}
      className="customer-node"
      style={{
        position: 'absolute',
        left: `${customer.position.x}px`,
        top: `${customer.position.y}px`,
      }}
      onClick={onClick}
    >
      <div className="customer-icon">
        <FaUsers size={20} />
      </div>
      <div className="customer-box">
        <h4>{customer.name}</h4>
        <div className="customer-details">
          <p><strong>Satisfaction:</strong> {customer.satisfaction}%</p>
          {customer.details && <p className="details-text">{customer.details}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomerNode;
