import React, { useState } from 'react';
import SupplierNode from './SupplierNode';
import ProcessBox from './ProcessBox';
import InventoryTriangle from './InventoryTriangle';
import FlowArrow from './FlowArrow';
import ProcessDetailModal from './ProcessDetailModal';
import './ValueStreamMap.css';

const ValueStreamMap = ({ data }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="map-container">
      <div className="value-stream-map">
        {/* Map Legend */}
        <div className="map-legend">
          <h6>Legend</h6>
          <div className="legend-item">
            <div className="legend-color legend-supplier"></div>
            <span>Supplier</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-process"></div>
            <span>Process</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-inventory"></div>
            <span>Inventory</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-material"></div>
            <span>Material Flow</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-information"></div>
            <span>Information Flow</span>
          </div>
        </div>
        
        {/* Suppliers */}
        {data.suppliers.map(supplier => (
          <SupplierNode 
            key={supplier.id}
            supplier={supplier}
            onClick={() => handleElementClick(supplier)}
          />
        ))}

        {/* Processes */}
        {data.processes.map(process => (
          <ProcessBox 
            key={process.id}
            process={process}
            onClick={() => handleElementClick(process)}
          />
        ))}

        {/* ERP Process */}
        {data.processes_erp && (
          <ProcessBox 
            key={data.processes_erp.id}
            process={data.processes_erp}
            isERP={true}
            onClick={() => handleElementClick(data.processes_erp)}
          />
        )}

        {/* Inventory Points */}
        {data.inventoryPoints.map(inventory => (
          <InventoryTriangle 
            key={inventory.id}
            inventory={inventory}
            onClick={() => handleElementClick(inventory)}
          />
        ))}

        {/* Material Flows */}
        {data.materialFlows.map(flow => (
          <FlowArrow 
            key={flow.id}
            flow={flow}
            type="material"
            nodes={[...data.suppliers, ...data.processes, ...data.inventoryPoints]}
            onClick={() => handleElementClick(flow)}
          />
        ))}

        {/* Information Flows */}
        {data.informationFlows.map(flow => (
          <FlowArrow 
            key={flow.id}
            flow={flow}
            type="information"
            nodes={[...data.suppliers, ...data.processes, ...data.inventoryPoints, data.processes_erp]}
            onClick={() => handleElementClick(flow)}
          />
        ))}

        {/* Customer */}
        {data.customer && (
          <div 
            className="customer-node"
            style={{
              position: 'absolute',
              left: `${data.customer.position.x}px`,
              top: `${data.customer.position.y}px`,
            }}
            onClick={() => handleElementClick(data.customer)}
          >
            <div className="customer-box">
              <h4>{data.customer.name}</h4>
              <p>Satisfaction: {data.customer.satisfaction}%</p>
            </div>
          </div>
        )}

        {/* Process Detail Modal */}
        {showModal && selectedElement && (
          <ProcessDetailModal 
            element={selectedElement}
            show={showModal}
            onHide={handleCloseModal}
            metrics={data.metrics}
          />
        )}

        {/* Timeline at the bottom */}
        <div className="timeline">
          <div className="timeline-header">
            <span>Total Lead Time: {data.metrics.currentState.totalLeadTime} days</span>
            <span>Value-Added: {data.metrics.currentState.valueAddedPercentage}%</span>
          </div>
          <div className="timeline-bar">
            <div 
              className="value-added"
              style={{ width: `${data.metrics.currentState.valueAddedPercentage}%` }}
            >
              Value Added: {data.metrics.currentState.valueAddedTime} days
            </div>
            <div 
              className="non-value-added-necessary"
              style={{ width: `${(data.metrics.currentState.nonValueAddedNecessaryTime / data.metrics.currentState.totalLeadTime) * 100}%` }}
            >
              Necessary Non-Value: {data.metrics.currentState.nonValueAddedNecessaryTime} days
            </div>
            <div 
              className="pure-waste"
              style={{ width: `${(data.metrics.currentState.pureWasteTime / data.metrics.currentState.totalLeadTime) * 100}%` }}
            >
              Waste: {data.metrics.currentState.pureWasteTime} days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueStreamMap;
