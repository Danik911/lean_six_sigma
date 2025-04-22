import React from 'react';
import { FaWarehouse } from 'react-icons/fa';
import './InventoryTriangle.css';

const InventoryTriangle = ({ inventory, onClick }) => {
  return (
    <div 
      className="inventory-node"
      style={{
        position: 'absolute',
        left: `${inventory.position.x}px`,
        top: `${inventory.position.y}px`,
      }}
      onClick={onClick}
    >
      <div className="inventory-icon">
        <FaWarehouse size={20} />
      </div>
      <div className="inventory-triangle">
        <div className="triangle"></div>
        <div className="inventory-details">
          <h4>{inventory.name}</h4>
          <p><strong>Location:</strong> {inventory.location}</p>
          <p><strong>Quantity:</strong> {inventory.averageQuantity}</p>
          {inventory.storageCapacityUtilization && (
            <p><strong>Capacity:</strong> {inventory.storageCapacityUtilization}%</p>
          )}
          {inventory.stockoutRate && (
            <p><strong>Stockout:</strong> {inventory.stockoutRate}%</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryTriangle;