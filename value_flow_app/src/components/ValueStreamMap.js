import React, { useState, useEffect, useRef } from 'react';
import SupplierNode from './SupplierNode';
import ProcessBox from './ProcessBox';
import InventoryTriangle from './InventoryTriangle';
import FlowArrow from './FlowArrow';
import ProcessDetailModal from './ProcessDetailModal';
import ProblemArea from './ProblemArea';
import LeanOpportunity from './LeanOpportunity';
import CustomerNode from './CustomerNode';
import { FaExclamationTriangle } from 'react-icons/fa';
import { 
  MdOutlineWarning, 
  MdOutlineCheckBox, 
  MdTimeline, 
  MdSpeed,
  MdAutorenew
} from 'react-icons/md';
import './ValueStreamMap.css';

const ValueStreamMap = ({ 
  data, 
  viewState,
  showProblemAreas,
  showLeanOpportunities,
  showMetrics
}) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const processesRef = useRef({});

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Use the viewState prop to determine which data to display
  const metrics = viewState === 'future' ? data.metrics.futureState : data.metrics.currentState;

  // Make sure future state has the necessary timeline values or provide defaults
  const timelineData = {
    totalLeadTime: metrics.totalLeadTime || 3.2, // Default value for future state
    valueAddedTime: metrics.valueAddedTime || 1.1, // Default value for future state
    nonValueAddedNecessaryTime: metrics.nonValueAddedNecessaryTime || 0.8, // Default value for future state
    pureWasteTime: metrics.pureWasteTime || 1.3, // Default value for future state
    valueAddedPercentage: metrics.valueAddedPercentage || 35, // Default value for future state
  };

  // Default filter settings
  const filterSettings = {
    showSuppliers: true,
    showProcesses: true,
    showInventory: true,
    showMaterialFlow: true,
    showInfoFlow: true,
    showProblemAreas,
    showLeanOpportunities
  };

  // Helper function to get the appropriate icon for lean opportunity types
  const getLeanOpportunityIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'kanban':
        return <MdOutlineCheckBox className="opportunity-icon" />;
      case '5s':
        return <MdOutlineWarning className="opportunity-icon" />;
      case 'smed':
        return <MdTimeline className="opportunity-icon" />;
      case 'automation':
        return <MdSpeed className="opportunity-icon" />;
      default:
        return <MdAutorenew className="opportunity-icon" />;
    }
  };

  // Get all nodes for flow arrows
  const getAllNodes = () => {
    const allNodes = [
      ...(data.suppliers || []),
      ...(data.processes || []),
      ...(data.inventoryPoints || []),
      data.customer,
      data.processes_erp
    ].filter(Boolean);
    
    return allNodes;
  };

  const nodes = getAllNodes();

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
            <MdAutorenew className="legend-icon legend-opportunity" />
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
            id={process.id} // Important to set ID for reference
            process={process}
            onClick={() => handleElementClick(process)}
            ref={el => processesRef.current[process.id] = el}
          />
        ))}

        {/* ERP Process */}
        {filterSettings.showProcesses && data.processes_erp && (
          <ProcessBox 
            key={data.processes_erp.id}
            id={data.processes_erp.id}
            process={data.processes_erp}
            isERP={true}
            onClick={() => handleElementClick(data.processes_erp)}
            ref={el => processesRef.current[data.processes_erp.id] = el}
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
            nodes={nodes}
            onClick={() => handleElementClick(flow)}
          />
        ))}

        {/* Information Flows */}
        {filterSettings.showInfoFlow && data.informationFlows.map(flow => (
          <FlowArrow 
            key={flow.id}
            flow={flow}
            type="information"
            nodes={nodes}
            onClick={() => handleElementClick(flow)}
          />
        ))}

        {/* Problem Areas - only show in current state */}
        {filterSettings.showProblemAreas && viewState === 'current' && data.problemAreas && data.problemAreas.map(problem => (
          <ProblemArea 
            key={problem.id}
            problem={problem}
            onClick={() => handleElementClick(problem)}
          />
        ))}

        {/* Lean Opportunities */}
        {filterSettings.showLeanOpportunities && data.leanOpportunities && data.leanOpportunities.map(opportunity => (
          <LeanOpportunity 
            key={opportunity.id}
            opportunity={opportunity}
            allProcesses={processesRef.current}
            onClick={() => handleElementClick(opportunity)}
          />
        ))}

        {/* Customer */}
        {data.customer && (
          <CustomerNode 
            customer={data.customer}
            onClick={() => handleElementClick(data.customer)}
          />
        )}

        {/* Process Detail Modal */}
        {showModal && selectedElement && (
          <ProcessDetailModal 
            element={selectedElement}
            show={showModal}
            onHide={handleCloseModal}
            metrics={data.metrics}
            view={viewState}
          />
        )}
      </div>

      {/* Timeline at the bottom */}
      {showMetrics && (
        <div className="bottom-timeline">
          <h4 className="timeline-title">Value Stream Timeline</h4>
          <div className="timeline">
            <div className="timeline-header">
              <span>Total Lead Time: {timelineData.totalLeadTime} days</span>
              <span>Value-Added: {timelineData.valueAddedPercentage}%</span>
            </div>
            <div className="timeline-bar">
              <div 
                className="value-added"
                style={{ width: `${timelineData.valueAddedPercentage}%` }}
              >
                Value Added: {timelineData.valueAddedTime} days
              </div>
              <div 
                className="non-value-added-necessary"
                style={{ width: `${(timelineData.nonValueAddedNecessaryTime / timelineData.totalLeadTime) * 100}%` }}
              >
                Necessary Non-Value: {timelineData.nonValueAddedNecessaryTime} days
              </div>
              <div 
                className="pure-waste"
                style={{ width: `${(timelineData.pureWasteTime / timelineData.totalLeadTime) * 100}%` }}
              >
                Waste: {timelineData.pureWasteTime} days
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueStreamMap;
