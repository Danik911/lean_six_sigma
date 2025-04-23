import React, { useState } from 'react';
import './App.css';
import { valueStreamData } from './valueStreamData';
import ValueStreamMap from './components/ValueStreamMap';
import ControlPanel from './ControlPanel';

function App() {
  const [viewState, setViewState] = useState('current'); // 'current', 'future', or 'ideal'
  const [showProblemAreas, setShowProblemAreas] = useState(true);
  const [showLeanOpportunities, setShowLeanOpportunities] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);
  
  const currentDate = 'April 2025';

  return (
    <div className="App">
      <header className="App-header">
        <h1>SimplePharma Inventory Management</h1>
        <div className="state-indicators">
          <span className={viewState === 'current' ? 'active' : ''}>Current</span>
          <span className={viewState === 'future' ? 'active' : ''}>Future</span>
          <span className={viewState === 'ideal' ? 'active' : ''}>Ideal</span>
        </div>
        <div className="current-date">
          {currentDate}
        </div>
      </header>
      
      <div className="app-container">
        <ControlPanel 
          viewState={viewState} 
          setViewState={setViewState}
          showProblemAreas={showProblemAreas}
          setShowProblemAreas={setShowProblemAreas}
          showLeanOpportunities={showLeanOpportunities}
          setShowLeanOpportunities={setShowLeanOpportunities}
          showMetrics={showMetrics}
          setShowMetrics={setShowMetrics}
        />
        
        <div className="map-container">
          <ValueStreamMap 
            data={valueStreamData} 
            viewState={viewState}
            showProblemAreas={showProblemAreas}
            showLeanOpportunities={showLeanOpportunities}
            showMetrics={showMetrics}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
