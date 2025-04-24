import React, { useState } from 'react';

// Main app component
const ValueStreamMap = () => {
  // Basic state
  const [viewMode, setViewMode] = useState('current'); // current, improved, ideal
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">SimplePharma Value Stream Map</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">
              <span>Info</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Control Bar */}
      <div className="bg-white shadow p-3 flex flex-wrap justify-between items-center gap-2">
        {/* View Mode Selector */}
        <div className="flex rounded overflow-hidden border">
          {['current', 'improved', 'ideal'].map(mode => (
            <button
              key={mode}
              className={`px-4 py-1 ${viewMode === mode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Simple content */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Value Stream Map</h2>
          <p className="mb-4">Current view mode: <strong>{viewMode}</strong></p>
          <div className="flex justify-center">
            <div className="bg-blue-100 border-2 border-blue-500 rounded p-4 m-2 text-center">
              <div>Supplier</div>
            </div>
            <div className="flex items-center">
              <div>→</div>
            </div>
            <div className="bg-purple-100 border-2 border-purple-500 rounded p-4 m-2 text-center">
              <div>Process</div>
            </div>
            <div className="flex items-center">
              <div>→</div>
            </div>
            <div className="bg-green-100 border-2 border-green-500 rounded p-4 m-2 text-center">
              <div>Customer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueStreamMap;