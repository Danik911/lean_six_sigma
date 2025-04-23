import React, { useState } from 'react';
import SupplierNode from './SupplierNode';
import ProcessBox from './ProcessBox';
import InventoryTriangle from './InventoryTriangle';
import FlowArrow from './FlowArrow';
import ProcessDetailModal from './ProcessDetailModal';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';
import './ValueStreamMap.css';

const ValueStreamMap = ({ data, view, selectedMetric, onNodeSelect, showStockTakeSimulation, filterSettings }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setShowModal(true);
    if (onNodeSelect) {
      onNodeSelect(element.id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Use the view prop to determine which data to display
  const metrics = view === 'future' ? data.metrics.futureState : data.metrics.currentState;

  return (
    <div className="value-stream-map">
      <div className="map-content">
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
          <div className="legend-item">
            <FaExclamationTriangle className="legend-icon legend-problem" />
            <span>Problem Area</span>
          </div>
          <div className="legend-item">
            <AiFillTool className="legend-icon legend-opportunity" />
            <span>Improvement Opportunity</span>
          </div>
        </div>
        
        {/* Suppliers */}
        {filterSettings.showSuppliers && data.suppliers.map(supplier => (
          <SupplierNode 
            key={supplier.id}
            supplier={supplier}
            onClick={() => handleElementClick(supplier)}
          />
        ))}

        {/* Processes */}
        {filterSettings.showProcesses && data.processes.map(process => (
          <ProcessBox 
            key={process.id}
            process={process}
            onClick={() => handleElementClick(process)}
          />
        ))}

        {/* ERP Process */}
        {filterSettings.showProcesses && data.processes_erp && (
          <ProcessBox 
            key={data.processes_erp.id}
            process={data.processes_erp}
            isERP={true}
            onClick={() => handleElementClick(data.processes_erp)}
          />
        )}

        {/* Inventory Points */}
        {filterSettings.showInventory && data.inventoryPoints.map(inventory => (
          <InventoryTriangle 
            key={inventory.id}
            inventory={inventory}
            onClick={() => handleElementClick(inventory)}
          />
        ))}

        {/* Material Flows */}
        {filterSettings.showMaterialFlow && data.materialFlows.map(flow => (
          <FlowArrow 
            key={flow.id}
            flow={flow}
            type="material"
            nodes={[...data.suppliers, ...data.processes, ...data.inventoryPoints]}
            onClick={() => handleElementClick(flow)}
          />
        ))}

        {/* Information Flows */}
        {filterSettings.showInfoFlow && data.informationFlows.map(flow => (
          <FlowArrow 
            key={flow.id}
            flow={flow}
            type="information"
            nodes={[...data.suppliers, ...data.processes, ...data.inventoryPoints, data.processes_erp]}
            onClick={() => handleElementClick(flow)}
          />
        ))}

        {/* Problem Areas */}
        {filterSettings.showProblemAreas && data.problemAreas && data.problemAreas.map(problem => (
          <div 
            key={problem.id}
            className="problem-area"
            style={{
              position: 'absolute',
              left: `${problem.position.x}px`,
              top: `${problem.position.y}px`,
            }}
            onClick={() => handleElementClick(problem)}
            title={problem.description}
          >
            <FaExclamationTriangle className="problem-icon" />
          </div>
        ))}

        {/* Lean Opportunities */}
        {filterSettings.showLeanOpportunities && data.leanOpportunities && data.leanOpportunities.map(opportunity => (
          <div 
            key={opportunity.id}
            className="lean-opportunity"
            style={{
              position: 'absolute',
              left: `${opportunity.position.x}px`,
              top: `${opportunity.position.y}px`,
            }}
            onClick={() => handleElementClick(opportunity)}
            title={opportunity.description}
          >
            <AiFillTool className="opportunity-icon" />
            <span className="opportunity-label">{opportunity.type.toUpperCase()}</span>
          </div>
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
              <p>{data.customer.details}</p>
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
            view={view}
          />
        )}
      </div>

      {/* Timeline at the bottom */}
      <div className="bottom-timeline">
        <h4 className="timeline-title">Value Stream Timeline</h4>
        <div className="timeline">
          <div className="timeline-header">
            <span>Total Lead Time: {metrics.totalLeadTime} days</span>
            <span>Value-Added: {metrics.valueAddedPercentage}%</span>
          </div>
          <div className="timeline-bar">
            <div 
              className="value-added"
              style={{ width: `${metrics.valueAddedPercentage}%` }}
            >
              Value Added: {metrics.valueAddedTime} days
            </div>
            <div 
              className="non-value-added-necessary"
              style={{ width: `${(metrics.nonValueAddedNecessaryTime / metrics.totalLeadTime) * 100}%` }}
            >
              Necessary Non-Value: {metrics.nonValueAddedNecessaryTime} days
            </div>
            <div 
              className="pure-waste"
              style={{ width: `${(metrics.pureWasteTime / metrics.totalLeadTime) * 100}%` }}
            >
              Waste: {metrics.pureWasteTime} days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueStreamMap;
