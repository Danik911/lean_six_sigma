import React from 'react';
import './EmptyMap.css';

function EmptyMap() {
  return (
    <div className="empty-map-container">
      <svg className="empty-map" width="100%" height="600px">
        {/* Empty map - no elements */}
      </svg>
    </div>
  );
}

export default EmptyMap;
