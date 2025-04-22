import React, { useState, useEffect, useRef } from 'react';

// Basic styling for nodes - consider moving to CSS
const nodeStyle = {
  fill: 'lightblue',
  stroke: 'black',
  strokeWidth: 1,
};

const textStyle = {
  fontSize: '10px',
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  pointerEvents: 'none', // Prevent text from blocking node clicks
};

const arrowStyle = {
  stroke: 'black',
  strokeWidth: 1,
  markerEnd: 'url(#arrowhead)',
};

const infoFlowStyle = {
  stroke: 'blue',
  strokeWidth: 1,
  strokeDasharray: '5,5',
  markerEnd: 'url(#infoArrowhead)',
};

function ValueStreamMap({ data, view, selectedMetric, onNodeSelect, showStockTakeSimulation, whatIfSettings, filterSettings, timelineRange }) {
  
  const nodeWidth = 80;
  const nodeHeight = 50;
  const inventorySize = 40; // For triangle base/height
  const spacing = 120; // Horizontal spacing between nodes
  
  // State for map container dimensions
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const containerRef = useRef(null);
  
  // Calculate required map dimensions based on nodes
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setDimensions({
        width: containerWidth,
        height: 400
      });
    }
    
    // Recalculate dimensions when window resizes
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: 400
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data, filterSettings]);

  // Apply what-if settings and filter by timeline
  const processData = () => {
    // Create a deep copy of data to avoid modifying original
    const processedData = JSON.parse(JSON.stringify(data));
    
    // Apply timeline range filter if specified
    if (timelineRange && processedData.timeline) {
      // Filter nodes based on timeline range (days)
      Object.keys(processedData).forEach(key => {
        if (Array.isArray(processedData[key])) {
          processedData[key] = processedData[key].filter(node => {
            // If node has timeline data, filter based on range
            return !node.timeline || node.timeline <= timelineRange;
          });
        }
      });
    }
    
    return processedData;
  };
  
  // Get processed data with timeline filter
  const processedData = processData();
  
  // Apply what-if settings to modify node data
  const applyWhatIfSettings = (node) => {
    // Clone the node to avoid modifying the original data
    const modifiedNode = {...node};
    
    // Apply staff training adjustments
    if (whatIfSettings && whatIfSettings.staffTraining && modifiedNode.metrics) {
      // Adjustments based on staff training level
      switch(whatIfSettings.staffTraining) {
        case 'Basic':
          if (modifiedNode.metrics.errorRate) {
            modifiedNode.metrics.errorRate = modifiedNode.metrics.errorRate * 1.2; // 20% worse
          }
          if (modifiedNode.metrics.cycleTime) {
            modifiedNode.metrics.cycleTime = Math.ceil(modifiedNode.metrics.cycleTime * 1.15); // 15% longer
          }
          if (modifiedNode.metrics.leadTime) {
            modifiedNode.metrics.leadTime = Math.ceil(modifiedNode.metrics.leadTime * 1.15); // 15% longer
          }
          break;
          
        case 'Advanced':
          if (modifiedNode.metrics.errorRate) {
            modifiedNode.metrics.errorRate = modifiedNode.metrics.errorRate * 0.8; // 20% better
          }
          if (modifiedNode.metrics.cycleTime) {
            modifiedNode.metrics.cycleTime = Math.max(1, Math.floor(modifiedNode.metrics.cycleTime * 0.85)); // 15% faster
          }
          if (modifiedNode.metrics.leadTime) {
            modifiedNode.metrics.leadTime = Math.max(1, Math.floor(modifiedNode.metrics.leadTime * 0.85)); // 15% faster
          }
          break;
          
        default: // Intermediate - no change
          break;
      }
    }
    
    return modifiedNode;
  };

  // Combine all node types for rendering
  const allNodes = [
    ...(filterSettings.showSuppliers ? processedData.suppliers || [] : []),
    ...(filterSettings.showProcesses ? processedData.processes || [] : []),
    ...(filterSettings.showInventory ? processedData.inventoryPoints || [] : []),
    ...(filterSettings.showSuppliers ? processedData.customers || [] : []),
  ].map(applyWhatIfSettings);

  // Calculate map bounds and auto-position nodes
  const positionNodes = () => {
    let currentX = 100;
    let maxX = 0;
    let maxY = 0;
    
    allNodes.forEach(node => {
      if (!node.x || !node.y) {
        node.x = currentX;
        node.y = 200; // Center vertically
        currentX += spacing;
      }
      
      // Track map boundaries
      maxX = Math.max(maxX, node.x + nodeWidth/2);
      maxY = Math.max(maxY, node.y + nodeHeight/2);
    });
    
    // Ensure minimum dimensions
    return {
      width: Math.max(dimensions.width, maxX + 100),  // Add padding
      height: Math.max(dimensions.height, maxY + 50)  // Add padding
    };
  };
  
  const mapDimensions = positionNodes();

  // Define arrow markers for flow lines
  const defineArrowMarkers = () => (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
      </marker>
      <marker
        id="infoArrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
      </marker>
    </defs>
  );

  // Generate material flow lines
  const renderFlows = () => {
    if (!processedData.materialFlows || !filterSettings.showMaterialFlow) return null;
    
    return processedData.materialFlows.map((flow, index) => {
      // Find source and target nodes
      const source = allNodes.find(node => node.id === flow.from);
      const target = allNodes.find(node => node.id === flow.to);
      
      if (!source || !target) return null;
      
      // Simple straight line from source to target
      return (
        <line
          key={`material-flow-${index}`}
          x1={source.x + nodeWidth/2}
          y1={source.y}
          x2={target.x - nodeWidth/2}
          y2={target.y}
          style={arrowStyle}
        />
      );
    });
  };

  // Generate information flow lines
  const renderInfoFlows = () => {
    if (!processedData.infoFlows || !filterSettings.showInfoFlow) return null;
    
    return processedData.infoFlows.map((flow, index) => {
      // Find source and target nodes
      const source = allNodes.find(node => node.id === flow.from);
      const target = allNodes.find(node => node.id === flow.to);
      
      if (!source || !target) return null;
      
      // Curved line for info flow, typically going in the reverse direction
      const midY = Math.min(source.y, target.y) - 50; // Curve upward
      
      return (
        <path
          key={`info-flow-${index}`}
          d={`M ${source.x} ${source.y - nodeHeight/2} 
              C ${source.x} ${midY}, ${target.x} ${midY}, 
              ${target.x} ${target.y - nodeHeight/2}`}
          fill="none"
          style={infoFlowStyle}
        />
      );
    });
  };

  // Render node with appropriate metric data
  const renderNodeMetrics = (node) => {
    if (!node.metrics) return null;
    
    let metricValue = null;
    let metricLabel = '';
    
    switch(selectedMetric.toLowerCase()) {
      case 'quality':
        if (node.metrics.errorRate !== undefined) {
          // Cap at 100% quality (0% error rate)
          const errorRate = Math.min(1, Math.max(0, node.metrics.errorRate));
          metricValue = `${(100 - errorRate * 100).toFixed(1)}%`;
          metricLabel = 'Quality:';
        }
        break;
      case 'time':
        if (node.type === 'process' && node.metrics.cycleTime !== undefined) {
          metricValue = `${node.metrics.cycleTime}d`;
          metricLabel = 'CT:';
        } else if (node.type === 'inventory' && node.metrics.leadTime !== undefined) {
          metricValue = `${node.metrics.leadTime}d`;
          metricLabel = 'LT:';
        }
        break;
      case 'cost':
        if (node.metrics.cost !== undefined) {
          metricValue = `$${node.metrics.cost}`;
          metricLabel = 'Cost:';
        }
        break;
      default:
        break;
    }
    
    if (metricValue) {
      return (
        <text x="0" y={node.type === 'inventory' ? inventorySize/2 + 22 : nodeHeight/2 + 15} 
          {...textStyle} fontSize="9px">
          {metricLabel} {metricValue}
        </text>
      );
    }
    
    return null;
  };

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'auto' }}>
      <svg width={mapDimensions.width} height={mapDimensions.height} style={{ border: '1px solid lightgray' }}>
        {defineArrowMarkers()}
        <g>
          {/* Render material and info flows */}
          {renderFlows()}
          {renderInfoFlows()}
          
          {/* Render all nodes */}
          {allNodes.map(node => {
            let shape;
            const commonProps = {
              onClick: () => onNodeSelect(node.id), // Make nodes clickable
              style: { cursor: 'pointer' }
            };

            if (node.type === 'process') {
              shape = (
                <g transform={`translate(${node.x}, ${node.y})`} key={node.id}>
                  <rect 
                    {...commonProps}
                    x={-nodeWidth / 2} 
                    y={-nodeHeight / 2} 
                    width={nodeWidth} 
                    height={nodeHeight} 
                    {...nodeStyle} 
                    fill="lightgreen" // Different color for process
                  />
                  <text x="0" y="0" {...textStyle}>{node.name}</text>
                  {renderNodeMetrics(node)}
                  
                  {/* Show stock take simulation indicator if active */}
                  {showStockTakeSimulation && node.stockTake && (
                    <rect 
                      x={nodeWidth / 2 - 10}
                      y={-nodeHeight / 2}
                      width="10"
                      height="10"
                      fill="red"
                    />
                  )}
                </g>
              );
            } else if (node.type === 'inventory') {
              shape = (
                <g transform={`translate(${node.x}, ${node.y})`} key={node.id}>
                  {/* Simple triangle for inventory */}
                  <polygon 
                    {...commonProps}
                    points={`0,${-inventorySize/2} ${inventorySize/2},${inventorySize/2} ${-inventorySize/2},${inventorySize/2}`} 
                    {...nodeStyle} 
                    fill="yellow" // Different color for inventory
                  />
                  <text x="0" y={inventorySize/2 + 10} {...textStyle}>{node.name}</text>
                  {renderNodeMetrics(node)}
                </g>
              );
            } else { // Default shape (e.g., for supplier, customer)
              shape = (
                <g transform={`translate(${node.x}, ${node.y})`} key={node.id}>
                  <rect 
                    {...commonProps}
                    x={-nodeWidth / 2} 
                    y={-nodeHeight / 2} 
                    width={nodeWidth} 
                    height={nodeHeight} 
                    {...nodeStyle} 
                  />
                  <text x="0" y="0" {...textStyle}>{node.name}</text>
                  {renderNodeMetrics(node)}
                </g>
              );
            }
            return shape;
          })}
        </g>
      </svg>
    </div>
  );
}

export default ValueStreamMap;
