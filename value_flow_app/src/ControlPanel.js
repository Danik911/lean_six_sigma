import React from 'react';
import './ControlPanel.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';

const ControlPanel = ({ 
  viewState, 
  setViewState,
  showProblemAreas,
  setShowProblemAreas,
  showLeanOpportunities,
  setShowLeanOpportunities,
  showMetrics,
  setShowMetrics
}) => {
  return (
    <div className="control-panel">
      <h3>Control Panel</h3>
      
      <div className="control-section">
        <h4>View State</h4>
        <div className="button-group">
          <button 
            className={viewState === 'current' ? 'active' : ''} 
            onClick={() => setViewState('current')}
          >
            Current
          </button>
          <button 
            className={viewState === 'future' ? 'active' : ''} 
            onClick={() => setViewState('future')}
          >
            Future
          </button>
          <button 
            className={viewState === 'ideal' ? 'active' : ''} 
            onClick={() => setViewState('ideal')}
          >
            Ideal
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h4>Display Options</h4>
        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={showProblemAreas} 
              onChange={(e) => setShowProblemAreas(e.target.checked)} 
            />
            <FaExclamationTriangle className="icon-problem" /> Problem Areas
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={showLeanOpportunities} 
              onChange={(e) => setShowLeanOpportunities(e.target.checked)} 
            />
            <AiFillTool className="icon-opportunity" /> Lean Opportunities
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={showMetrics} 
              onChange={(e) => setShowMetrics(e.target.checked)} 
            />
            Metrics
          </label>
        </div>
      </div>
      
      <div className="metrics-summary">
        <h4>Current Metrics</h4>
        <div className="metric-item">
          <span className="metric-label">Inventory Accuracy:</span>
          <span className="metric-value">76.5%</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Lead Time:</span>
          <span className="metric-value">5.5 days</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Value-Added Time:</span>
          <span className="metric-value">0.8 days (14.5%)</span>
        </div>
      </div>
      
      <div className="improvement-summary">
        <h4>Key Improvement Opportunities</h4>
        <ul>
          <li>RFID Implementation</li>
          <li>Kanban System</li>
          <li>5S Organization</li>
          <li>SMED for Stock-take</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
