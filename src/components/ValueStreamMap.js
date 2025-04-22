import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import SupplierComponent from './SupplierComponent';
import ProcessComponent from './ProcessComponent';
import InventoryComponent from './InventoryComponent';
import InformationFlowComponent from './InformationFlowComponent';
import MaterialFlowComponent from './MaterialFlowComponent';
import CustomerComponent from './CustomerComponent';
import TimelineComponent from './TimelineComponent';
import ImprovementComponent from './ImprovementComponent';
import StockTakeSimulation from './StockTakeSimulation';
import './ValueStreamMap.css';

const ValueStreamMap = ({ 
  data, 
  view, 
  selectedMetric, 
  onNodeSelect, 
  showStockTakeSimulation 
}) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data) return;
    
    // Clear previous map
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Set up the SVG dimensions
    const width = 1200;
    const height = 800;
    
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    // Create groups for each component type
    const suppliersGroup = svg.append("g").attr("class", "suppliers-group");
    const processesGroup = svg.append("g").attr("class", "processes-group");
    const inventoryGroup = svg.append("g").attr("class", "inventory-group");
    const flowsGroup = svg.append("g").attr("class", "flows-group");
    const customerGroup = svg.append("g").attr("class", "customer-group");
    const improvementsGroup = svg.append("g").attr("class", "improvements-group");
    
    // Draw material flows first (so they're in the background)
    data.materialFlows.forEach(flow => {
      const sourceNode = findNodeById(flow.from);
      const targetNode = findNodeById(flow.to);
      
      if (sourceNode && targetNode) {
        const sourcePos = sourceNode.position;
        const targetPos = targetNode.position;
        
        flowsGroup.append("path")
          .attr("d", generatePath(sourcePos, targetPos))
          .attr("class", `material-flow ${flow.type}-flow`)
          .attr("marker-end", "url(#arrow)")
          .on("click", () => onNodeSelect(flow.id));
      }
    });
    
    // Draw information flows
    data.informationFlows.forEach(flow => {
      const sourceNode = findNodeById(flow.from);
      const targetNode = findNodeById(flow.to);
      
      if (sourceNode && targetNode) {
        // For information flows, we might want to offset them
        const sourcePos = offsetPosition(sourceNode.position, 10, -10);
        const targetPos = offsetPosition(targetNode.position, 10, -10);
        
        flowsGroup.append("path")
          .attr("d", generatePath(sourcePos, targetPos, true))
          .attr("class", `info-flow ${flow.type}-flow`)
          .attr("marker-end", "url(#info-arrow)")
          .on("click", () => onNodeSelect(flow.id));
      }
    });
    
    // Draw suppliers
    data.suppliers.forEach(supplier => {
      suppliersGroup.append("g")
        .attr("transform", `translate(${supplier.position.x}, ${supplier.position.y})`)
        .attr("class", "supplier-node")
        .on("click", () => onNodeSelect(supplier.id))
        .call(g => {
          const supplierElement = document.createElement("div");
          supplierElement.style.position = "absolute";
          supplierElement.style.left = `${supplier.position.x}px`;
          supplierElement.style.top = `${supplier.position.y}px`;
          supplierElement.style.pointerEvents = "none";
          
          // Render the React component to string and insert into the DOM
          // In an actual implementation, you would use React portals or other methods
          supplierElement.innerHTML = `
            <div class="supplier-box">
              <h4>${supplier.name}</h4>
              <p>${supplier.productType}</p>
              <p>Delivery: ${supplier.deliverySchedule}</p>
              <p>Lead time: ${supplier.leadTime} days</p>
            </div>
          `;
          
          document.getElementById("vsm-overlay").appendChild(supplierElement);
        });
    });
    
    // Draw inventory points
    data.inventoryPoints.forEach(inventory => {
      inventoryGroup.append("g")
        .attr("transform", `translate(${inventory.position.x}, ${inventory.position.y})`)
        .attr("class", "inventory-node")
        .on("click", () => onNodeSelect(inventory.id))
        .call(g => {
          g.append("path")
            .attr("d", "M 0,-30 L 30,0 L 0,30 L -30,0 Z")
            .attr("class", "inventory-triangle");
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .text(inventory.averageQuantity);
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("y", 15)
            .text(`${inventory.storageTime}h`);
        });
    });
    
    // Draw processes
    data.processes.forEach(process => {
      processesGroup.append("g")
        .attr("transform", `translate(${process.position.x}, ${process.position.y})`)
        .attr("class", "process-node")
        .on("click", () => onNodeSelect(process.id))
        .call(g => {
          g.append("rect")
            .attr("x", -60)
            .attr("y", -40)
            .attr("width", 120)
            .attr("height", 80)
            .attr("class", "process-box");
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-1.5em")
            .text(process.name);
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .attr("class", "process-time")
            .text(`CT: ${process.cycleTime} min`);
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("class", "process-value")
            .text(`VA: ${Math.round((process.valueAddedTime / process.cycleTime) * 100)}%`);
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "2.7em")
            .text(`Staff: ${process.staff}`);
          
          // Add data box below process
          g.append("rect")
            .attr("x", -60)
            .attr("y", 45)
            .attr("width", 120)
            .attr("height", 40)
            .attr("class", "data-box");
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("y", 65)
            .attr("class", "data-text")
            .text(() => {
              switch(selectedMetric) {
                case 'time':
                  return `Time: ${process.cycleTime} min`;
                case 'value':
                  return `Value: ${process.valueAddedTime} min`;
                case 'staff':
                  return `Staff: ${process.staff}`;
                default:
                  return `Time: ${process.cycleTime} min`;
              }
            });
        });
    });
    
    // Draw customer
    if (data.customer) {
      customerGroup.append("g")
        .attr("transform", `translate(${data.customer.position.x}, ${data.customer.position.y})`)
        .attr("class", "customer-node")
        .on("click", () => onNodeSelect(data.customer.id))
        .call(g => {
          g.append("rect")
            .attr("x", -50)
            .attr("y", -30)
            .attr("width", 100)
            .attr("height", 60)
            .attr("class", "customer-box");
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .text(data.customer.name);
          
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .text(`Sat: ${data.customer.satisfaction}%`);
        });
    }
    
    // Draw improvement opportunities if in future state view
    if (view === 'future') {
      data.improvementOpportunities.forEach(improvement => {
        improvementsGroup.append("g")
          .attr("transform", `translate(${improvement.position.x}, ${improvement.position.y})`)
          .attr("class", "improvement-node")
          .on("click", () => onNodeSelect(improvement.id))
          .call(g => {
            // Create a star shape for the kaizen burst
            g.append("path")
              .attr("d", generateStarPath(0, 0, 25, 10, 5))
              .attr("class", "kaizen-burst");
            
            g.append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "0.3em")
              .text(`${improvement.name}`);
          });
      });
    }
    
    // Add timeline at the bottom
    const timelineY = height - 80;
    const timelineGroup = svg.append("g")
      .attr("transform", `translate(50, ${timelineY})`)
      .attr("class", "timeline-group");
    
    timelineGroup.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width - 100)
      .attr("y2", 0)
      .attr("class", "timeline-line");
    
    const totalDays = data.metrics.totalLeadTime;
    const valueAddedDays = data.metrics.valueAddedTime;
    const nonValueAddedNecessaryDays = data.metrics.nonValueAddedNecessaryTime;
    const wasteTimeDays = data.metrics.pureWasteTime;
    
    const scaleX = d3.scaleLinear()
      .domain([0, totalDays])
      .range([0, width - 100]);
    
    // Add value added time segment
    timelineGroup.append("line")
      .attr("x1", 0)
      .attr("y1", 15)
      .attr("x2", scaleX(valueAddedDays))
      .attr("y2", 15)
      .attr("class", "timeline-value-added");
    
    timelineGroup.append("text")
      .attr("x", scaleX(valueAddedDays / 2))
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("class", "timeline-text")
      .text(`Value Added: ${valueAddedDays} days (${data.metrics.valueAddedPercentage}%)`);
    
    // Add necessary non-value added time segment
    timelineGroup.append("line")
      .attr("x1", scaleX(valueAddedDays))
      .attr("y1", 15)
      .attr("x2", scaleX(valueAddedDays + nonValueAddedNecessaryDays))
      .attr("y2", 15)
      .attr("class", "timeline-necessary");
    
    timelineGroup.append("text")
      .attr("x", scaleX(valueAddedDays + nonValueAddedNecessaryDays / 2))
      .attr("y", 45)
      .attr("text-anchor", "middle")
      .attr("class", "timeline-text")
      .text(`Necessary Non-Value: ${nonValueAddedNecessaryDays} days (${Math.round((nonValueAddedNecessaryDays/totalDays)*100)}%)`);
    
    // Add waste time segment
    timelineGroup.append("line")
      .attr("x1", scaleX(valueAddedDays + nonValueAddedNecessaryDays))
      .attr("y1", 15)
      .attr("x2", scaleX(totalDays))
      .attr("y2", 15)
      .attr("class", "timeline-waste");
    
    timelineGroup.append("text")
      .attr("x", scaleX(valueAddedDays + nonValueAddedNecessaryDays + wasteTimeDays / 2))
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .attr("class", "timeline-text")
      .text(`Pure Waste: ${wasteTimeDays} days (${Math.round((wasteTimeDays/totalDays)*100)}%)`);
    
    // Add total lead time label
    timelineGroup.append("text")
      .attr("x", scaleX(totalDays / 2))
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("class", "timeline-title")
      .text(`Total Lead Time: ${totalDays} days`);
    
    // Define arrow markers for different flow types
    svg.append("defs").selectAll("marker")
      .data(["arrow", "info-arrow"])
      .enter().append("marker")
      .attr("id", d => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", d => d === "arrow" ? "arrow-head" : "info-arrow-head");
    
  }, [data, view, selectedMetric]);
  
  // Helper functions
  const findNodeById = (id) => {
    if (id === "customer") return data.customer;
    
    if (id.startsWith("supplier-")) {
      return data.suppliers.find(s => s.id === id);
    } else if (id.startsWith("process-")) {
      return data.processes.find(p => p.id === id);
    } else if (id.startsWith("inventory-")) {
      return data.inventoryPoints.find(i => i.id === id);
    }
    
    // Special case for "supplier-all"
    if (id === "supplier-all") {
      // Return an average position of all suppliers
      const avgX = data.suppliers.reduce((sum, s) => sum + s.position.x, 0) / data.suppliers.length;
      const avgY = data.suppliers.reduce((sum, s) => sum + s.position.y, 0) / data.suppliers.length;
      return { position: { x: avgX, y: avgY } };
    }
    
    return null;
  };
  
  const offsetPosition = (pos, dx, dy) => {
    return { x: pos.x + dx, y: pos.y + dy };
  };
  
  const generatePath = (source, target, isInfoFlow = false) => {
    if (isInfoFlow) {
      // For information flows, use a curved path
      const midX = (source.x + target.x) / 2;
      const midY = source.y - 50; // Curve upward
      return `M ${source.x} ${source.y} Q ${midX} ${midY}, ${target.x} ${target.y}`;
    } else {
      // For material flows, use a straight path
      return `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
    }
  };
  
  const generateStarPath = (cx, cy, outerRadius, innerRadius, points) => {
    let path = "";
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / points) * i;
      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);
      
      path += (i === 0 ? "M " : " L ") + x + " " + y;
    }
    
    return path + " Z";
  };
  
  return (
    <div className="value-stream-map">
      <svg ref={svgRef} className="vsm-svg"></svg>
      <div id="vsm-overlay" className="vsm-overlay"></div>
      
      {showStockTakeSimulation && (
        <StockTakeSimulation 
          stockTakeData={data.processes.find(p => p.id === "process-stock-take")} 
        />
      )}
    </div>
  );
};

export default ValueStreamMap;
