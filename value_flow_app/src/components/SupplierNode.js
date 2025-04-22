import React from 'react';
import { FaIndustry } from 'react-icons/fa';
import './SupplierNode.css';

const SupplierNode = ({ supplier, onClick }) => {
  return (
    <div 
      className="supplier-node"
      style={{
        position: 'absolute',
        left: `${supplier.position.x}px`,
        top: `${supplier.position.y}px`,
        // The transform will be handled by the CSS class now
      }}
      onClick={onClick}
    >
      <div className="supplier-icon">
        <FaIndustry size={24} />
      </div>
      <div className="supplier-box">
        <h4>{supplier.name}</h4>
        <div className="supplier-details">
          <p><strong>Products:</strong> {supplier.productType}</p>
          <p><strong>Delivery:</strong> {supplier.deliveryFrequency}</p>
          <p><strong>Lead Time:</strong> {supplier.leadTime}</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierNode;