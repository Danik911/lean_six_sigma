import React from 'react';
import { Modal, Button, Tabs, Tab, Table, Badge } from 'react-bootstrap';
import { FaCogs, FaWarehouse, FaIndustry, FaUsers, FaArrowRight } from 'react-icons/fa';
import './ProcessDetailModal.css';

const ProcessDetailModal = ({ element, show, onHide, metrics }) => {
  const getIcon = () => {
    if (element.id?.includes('supplier')) {
      return <FaIndustry className="modal-icon supplier" />;
    } else if (element.id?.includes('process')) {
      return <FaCogs className="modal-icon process" />;
    } else if (element.id?.includes('inventory')) {
      return <FaWarehouse className="modal-icon inventory" />;
    } else if (element.id?.includes('customer')) {
      return <FaUsers className="modal-icon customer" />;
    } else if (element.id?.includes('material') || element.id?.includes('info')) {
      return <FaArrowRight className="modal-icon flow" />;
    }
    return null;
  };

  const renderSupplierDetails = () => {
    return (
      <div className="supplier-detail-content">
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Products:</td>
              <td>{element.productType}</td>
            </tr>
            <tr>
              <td>Delivery Frequency:</td>
              <td>{element.deliveryFrequency}</td>
            </tr>
            <tr>
              <td>Lead Time:</td>
              <td>{element.leadTime}</td>
            </tr>
            <tr>
              <td>Process Time:</td>
              <td>{element.processTime} days</td>
            </tr>
          </tbody>
        </Table>
        <div className="detail-description mt-3">
          <h6>Description:</h6>
          <p>{element.details}</p>
        </div>
        <div className="future-state mt-3">
          <h6>Future State Improvements:</h6>
          <ul>
            <li>API integration for automated order processing</li>
            <li>Real-time inventory visibility</li>
            <li>Collaborative forecasting</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderProcessDetails = () => {
    const hasProcessTimes = element.processTimes && Object.keys(element.processTimes).length > 0;
    
    return (
      <div className="process-detail-content">
        {hasProcessTimes && (
          <div className="process-times mb-3">
            <h6>Process Times:</h6>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Product Type</th>
                  <th>Time (hours)</th>
                </tr>
              </thead>
              <tbody>
                {element.processTimes.medicalDevices && (
                  <tr>
                    <td>Medical Devices</td>
                    <td>{element.processTimes.medicalDevices}</td>
                  </tr>
                )}
                {element.processTimes.drugs && (
                  <tr>
                    <td>Drugs</td>
                    <td>{element.processTimes.drugs}</td>
                  </tr>
                )}
                {element.processTimes.miscellaneous && (
                  <tr>
                    <td>Miscellaneous</td>
                    <td>{element.processTimes.miscellaneous}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
        
        <div className="process-metrics mb-3">
          <h6>Process Metrics:</h6>
          <Table striped bordered hover size="sm">
            <tbody>
              {element.cycleTime && (
                <tr>
                  <td>Cycle Time:</td>
                  <td>{element.cycleTime.min} - {element.cycleTime.max} hours</td>
                </tr>
              )}
              {element.waitTime && (
                <tr>
                  <td>Wait Time:</td>
                  <td>{element.waitTime.min} - {element.waitTime.max} hours</td>
                </tr>
              )}
              {element.valueAddedRatio && (
                <tr>
                  <td>Value Added Ratio:</td>
                  <td>
                    <Badge bg={element.valueAddedRatio > 50 ? "success" : element.valueAddedRatio > 30 ? "warning" : "danger"}>
                      {element.valueAddedRatio}%
                    </Badge>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        
        {element.resources && (
          <div className="resources mb-3">
            <h6>Resources:</h6>
            <Table striped bordered hover size="sm">
              <tbody>
                {element.resources.staff && (
                  <tr>
                    <td>Staff:</td>
                    <td>{element.resources.staff.min} - {element.resources.staff.max} personnel</td>
                  </tr>
                )}
                {element.resources.equipment && (
                  <tr>
                    <td>Equipment:</td>
                    <td>{element.resources.equipment.join(', ')}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
        
        <div className="detail-description mt-3">
          <h6>Description:</h6>
          <p>{element.details}</p>
        </div>
        
        <div className="future-state mt-3">
          <h6>Future State Improvements:</h6>
          <ul>
            <li>RFID-enabled receiving and verification</li>
            <li>Digital proof of delivery system</li>
            <li>Automated quantity verification</li>
            <li>Real-time inventory updates with location tracking</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderInventoryDetails = () => {
    return (
      <div className="inventory-detail-content">
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Location:</td>
              <td>{element.location}</td>
            </tr>
            <tr>
              <td>Average Quantity:</td>
              <td>{element.averageQuantity} units</td>
            </tr>
            {element.storageCapacityUtilization && (
              <tr>
                <td>Storage Capacity Utilization:</td>
                <td>
                  <Badge bg={element.storageCapacityUtilization > 90 ? "danger" : element.storageCapacityUtilization > 70 ? "warning" : "success"}>
                    {element.storageCapacityUtilization}%
                  </Badge>
                </td>
              </tr>
            )}
            {element.stockoutRate && (
              <tr>
                <td>Stockout Rate:</td>
                <td>
                  <Badge bg={element.stockoutRate > 5 ? "danger" : element.stockoutRate > 2 ? "warning" : "success"}>
                    {element.stockoutRate}%
                  </Badge>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="detail-description mt-3">
          <h6>Description:</h6>
          <p>{element.details}</p>
        </div>
        <div className="future-state mt-3">
          <h6>Future State Improvements:</h6>
          <ul>
            <li>RFID tagging for all inventory</li>
            <li>Real-time inventory visibility system</li>
            <li>Optimized storage layouts based on turnover</li>
            <li>Automated replenishment triggers</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderFlowDetails = () => {
    return (
      <div className="flow-detail-content">
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Flow Type:</td>
              <td>{element.id?.includes('material') ? 'Material Flow' : 'Information Flow'}</td>
            </tr>
            <tr>
              <td>From:</td>
              <td>{element.from}</td>
            </tr>
            <tr>
              <td>To:</td>
              <td>{element.to}</td>
            </tr>
            {element.frequency && (
              <tr>
                <td>Frequency:</td>
                <td>{element.frequency}</td>
              </tr>
            )}
            {element.transportMethod && (
              <tr>
                <td>Transport Method:</td>
                <td>{element.transportMethod}</td>
              </tr>
            )}
            {element.medium && (
              <tr>
                <td>Medium:</td>
                <td>{element.medium}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="detail-description mt-3">
          <h6>Description:</h6>
          <p>{element.details}</p>
        </div>
      </div>
    );
  };

  const renderCustomerDetails = () => {
    return (
      <div className="customer-detail-content">
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Customer Satisfaction:</td>
              <td>
                <Badge bg={element.satisfaction > 90 ? "success" : element.satisfaction > 80 ? "warning" : "danger"}>
                  {element.satisfaction}%
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="detail-description mt-3">
          <h6>Description:</h6>
          <p>{element.details}</p>
        </div>
      </div>
    );
  };

  const renderDetailContent = () => {
    if (element.id?.includes('supplier')) {
      return renderSupplierDetails();
    } else if (element.id?.includes('process')) {
      return renderProcessDetails();
    } else if (element.id?.includes('inventory')) {
      return renderInventoryDetails();
    } else if (element.id?.includes('customer')) {
      return renderCustomerDetails();
    } else if (element.id?.includes('material') || element.id?.includes('info')) {
      return renderFlowDetails();
    }
    return <p>No details available</p>;
  };

  const renderMetricsTab = () => {
    const currentMetrics = metrics?.currentState || {};
    const futureMetrics = metrics?.futureState || {};
    
    return (
      <div className="metrics-tab-content">
        <h6>Current State Metrics</h6>
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Total Lead Time:</td>
              <td>{currentMetrics.totalLeadTime} days</td>
            </tr>
            <tr>
              <td>Value-Added Time:</td>
              <td>{currentMetrics.valueAddedTime} days</td>
            </tr>
            <tr>
              <td>Value-Added Percentage:</td>
              <td>
                <Badge bg={currentMetrics.valueAddedPercentage > 30 ? "success" : currentMetrics.valueAddedPercentage > 15 ? "warning" : "danger"}>
                  {currentMetrics.valueAddedPercentage}%
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Receiving Accuracy:</td>
              <td>
                <Badge bg={currentMetrics.receivingAccuracy > 95 ? "success" : currentMetrics.receivingAccuracy > 90 ? "warning" : "danger"}>
                  {currentMetrics.receivingAccuracy}%
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Average Processing Time:</td>
              <td>{currentMetrics.avgProcessingTimePerDelivery} hours</td>
            </tr>
            <tr>
              <td>Manual Counting Errors:</td>
              <td>
                <Badge bg={currentMetrics.manualCountingErrors < 3 ? "success" : currentMetrics.manualCountingErrors < 7 ? "warning" : "danger"}>
                  {currentMetrics.manualCountingErrors}%
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
        
        <h6 className="mt-4">Future State Targets</h6>
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Processing Time Target:</td>
              <td>{futureMetrics.processingTimeTarget} hours</td>
            </tr>
            <tr>
              <td>Receiving Accuracy Target:</td>
              <td>
                <Badge bg="success">
                  {futureMetrics.receivingAccuracyTarget}%
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Value-Added Percentage Target:</td>
              <td>
                <Badge bg="success">
                  {futureMetrics.valueAddedPercentage}%
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Technology Improvements:</td>
              <td>
                {futureMetrics.rfidImplementation && <Badge bg="info" className="me-1">RFID</Badge>}
                {futureMetrics.digitalProofOfDelivery && <Badge bg="info" className="me-1">Digital POD</Badge>}
                {futureMetrics.automatedVerification && <Badge bg="info">Auto Verification</Badge>}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {getIcon()} {element.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="details" className="mb-3">
          <Tab eventKey="details" title="Details">
            {renderDetailContent()}
          </Tab>
          <Tab eventKey="metrics" title="Metrics">
            {renderMetricsTab()}
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProcessDetailModal;
