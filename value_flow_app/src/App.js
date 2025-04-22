import React from 'react';
import './App.css';
import ValueStreamMap from './components/ValueStreamMap';
import ControlPanel from './components/ControlPanel';
import { valueStreamData } from './valueStreamData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SimplePharma Value Stream Map</h1>
      </header>
      <div className="App-container">
        <ControlPanel />
        <ValueStreamMap data={valueStreamData} />
      </div>
    </div>
  );
}

export default App;
