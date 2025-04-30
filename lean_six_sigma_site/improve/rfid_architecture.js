/**
 * SimplePharma RFID System Architecture Visualization
 * Pure vanilla JavaScript implementation with no external dependencies
 * Created for the Lean Six Sigma Project - Improve Phase
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Get the container for the RFID architecture diagram
    const rfidContainer = document.getElementById('rfid-architecture-container');
    
    if (!rfidContainer) {
      console.error('[RFID Architecture] Container not found in the DOM');
      return;
    }

    // Clear any loading indicators or previous content
    rfidContainer.innerHTML = '';
    
    // Create the main container with inline styles to avoid any CSS conflicts
    const containerDiv = document.createElement('div');
    containerDiv.className = 'rfid-system-architecture';
    Object.assign(containerDiv.style, {
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '15px 0',
      fontFamily: 'Arial, sans-serif'
    });
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'SimplePharma RFID System Architecture';
    Object.assign(title.style, {
      textAlign: 'center',
      marginBottom: '15px',
      color: '#1e40af',
      fontWeight: 'bold'
    });
    containerDiv.appendChild(title);
    
    // Add subtitle
    const subtitle = document.createElement('p');
    subtitle.textContent = 'End-to-end RFID-based inventory tracking system with cloud integration';
    Object.assign(subtitle.style, {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#4b5563',
      fontSize: '14px'
    });
    containerDiv.appendChild(subtitle);
    
    // Define all RFID architecture layers
    const layers = [
      {
        name: 'RFID Tags Layer',
        components: [
          { name: 'Pharmaceutical Products', description: 'UHF RFID Tags', icon: 'tag' },
          { name: 'Medical Devices', description: 'UHF RFID Tags', icon: 'tag' },
          { name: 'Miscellaneous Goods', description: 'UHF RFID Tags', icon: 'tag' }
        ]
      },
      {
        name: 'RFID Readers Layer',
        components: [
          { name: 'Fixed RFID Readers', description: 'Zebra FX9600 at Entry/Exit', icon: 'radio' },
          { name: 'Handheld Readers', description: 'For Staff Use', icon: 'tablet' },
          { name: 'RFID Portals', description: 'At Key Transition Points', icon: 'radio' }
        ]
      },
      {
        name: 'Edge Processing',
        components: [
          { name: 'Local Data Processing', description: 'Edge Computing Units', icon: 'cpu' },
          { name: 'Signal Filtering', description: 'Noise Reduction', icon: 'layers' },
          { name: 'Initial Validation', description: 'Data Integrity Check', icon: 'clipboard' }
        ]
      },
      {
        name: 'Middleware Layer',
        components: [
          { name: 'Event Processing', description: 'Real-time Events', icon: 'server' },
          { name: 'Data Aggregation', description: 'Information Consolidation', icon: 'database' },
          { name: 'Business Rules', description: 'Workflow Automation', icon: 'clipboard' }
        ]
      },
      {
        name: 'Integration Layer',
        components: [
          { name: 'Omega ERP Connection', description: 'Bi-directional Data Flow', icon: 'database' },
          { name: 'AWS Cloud Storage', description: 'Secure Data Repository', icon: 'cloud' },
          { name: 'API Interfaces', description: 'External Systems Access', icon: 'globe' }
        ]
      },
      {
        name: 'AI/ML Layer',
        components: [
          { name: 'Demand Forecasting', description: 'Predictive Analytics', icon: 'bar-chart-2' },
          { name: 'Anomaly Detection', description: 'Unusual Pattern Recognition', icon: 'alert-triangle' },
          { name: 'Inventory Optimization', description: 'Smart Replenishment', icon: 'box' }
        ]
      },
      {
        name: 'Application Layer',
        components: [
          { name: 'Inventory Dashboard', description: 'Real-time Visibility', icon: 'bar-chart-2' },
          { name: 'Alert Management', description: 'Issue Notifications', icon: 'alert-triangle' },
          { name: 'Admin Interface', description: 'System Configuration', icon: 'users' },
          { name: 'Shop Floor Operations', description: 'Staff Tools', icon: 'shopping-bag' }
        ]
      }
    ];
    
    // Render each layer
    layers.forEach((layer, index) => {
      // Create and add the layer component
      const layerDiv = createLayerComponent(layer);
      containerDiv.appendChild(layerDiv);
      
      // Add arrow between layers (except after the last layer)
      if (index < layers.length - 1) {
        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'arrow-down';
        Object.assign(arrowDiv.style, {
          textAlign: 'center',
          margin: '10px 0'
        });
        
        // Simple down arrow character
        const arrowContent = document.createElement('span');
        arrowContent.innerHTML = '&#8595;'; // Down arrow
        Object.assign(arrowContent.style, {
          fontSize: '24px',
          color: '#3b82f6'
        });
        
        arrowDiv.appendChild(arrowContent);
        containerDiv.appendChild(arrowDiv);
      }
    });
    
    // Add benefits panel
    const benefitsPanel = createBenefitsPanel();
    containerDiv.appendChild(benefitsPanel);
    
    // Add the main container to the RFID container
    rfidContainer.appendChild(containerDiv);
    
    /**
     * Creates a layer component with header and components
     */
    function createLayerComponent(layer) {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'rfid-layer';
      Object.assign(layerDiv.style, {
        display: 'flex',
        marginBottom: '10px',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        overflow: 'hidden'
      });
      
      // Layer header
      const headerDiv = document.createElement('div');
      headerDiv.className = 'layer-header';
      Object.assign(headerDiv.style, {
        width: '180px',
        backgroundColor: '#1d4ed8',
        color: 'white',
        padding: '10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      });
      headerDiv.textContent = layer.name;
      
      // Components container
      const componentsDiv = document.createElement('div');
      componentsDiv.className = 'layer-components';
      Object.assign(componentsDiv.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '10px',
        flex: '1',
        backgroundColor: 'white'
      });
      
      // Add components to the container
      layer.components.forEach(component => {
        const componentDiv = createComponentBox(component);
        componentsDiv.appendChild(componentDiv);
      });
      
      // Add header and components to the layer
      layerDiv.appendChild(headerDiv);
      layerDiv.appendChild(componentsDiv);
      
      return layerDiv;
    }
    
    /**
     * Creates a component box with icon, name, and description
     */
    function createComponentBox(component) {
      const boxDiv = document.createElement('div');
      boxDiv.className = 'component-box';
      Object.assign(boxDiv.style, {
        backgroundColor: '#ebf5ff',
        borderRadius: '6px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '120px',
        textAlign: 'center'
      });
      
      // Create icon circle
      const iconDiv = document.createElement('div');
      iconDiv.className = 'component-icon';
      Object.assign(iconDiv.style, {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px'
      });
      
      // Set icon content (first letter of icon name in uppercase)
      iconDiv.textContent = component.icon[0].toUpperCase();
      Object.assign(iconDiv.style, {
        fontWeight: 'bold',
        color: '#2563eb'
      });
      
      // Component name
      const nameDiv = document.createElement('div');
      nameDiv.className = 'component-name';
      Object.assign(nameDiv.style, {
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '4px'
      });
      nameDiv.textContent = component.name;
      
      // Component description
      const descDiv = document.createElement('div');
      descDiv.className = 'component-description';
      Object.assign(descDiv.style, {
        fontSize: '12px',
        color: '#6b7280'
      });
      descDiv.textContent = component.description;
      
      // Add all elements to the component box
      boxDiv.appendChild(iconDiv);
      boxDiv.appendChild(nameDiv);
      boxDiv.appendChild(descDiv);
      
      return boxDiv;
    }
    
    /**
     * Creates the benefits panel with title and benefit items
     */
    function createBenefitsPanel() {
      const benefits = [
        { title: 'Inventory Visibility', description: 'Real-time tracking of inventory movement across all locations' },
        { title: 'Accuracy', description: '99.8% read accuracy vs. 94% with barcode scanning' },
        { title: 'Efficiency', description: '73% reduction in inventory count time in pilot area' },
        { title: 'Security', description: 'Automated alerting for unauthorized item movement' },
        { title: 'Analytics', description: 'Enhanced data collection for movement patterns and dwell times' },
        { title: 'ROI', description: 'Eliminates quarterly store closures and increases revenue by 15%' }
      ];
      
      // Create panel container
      const panelDiv = document.createElement('div');
      panelDiv.className = 'benefits-panel';
      Object.assign(panelDiv.style, {
        marginTop: '30px',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '15px'
      });
      
      // Title
      const titleDiv = document.createElement('div');
      titleDiv.className = 'benefits-title';
      Object.assign(titleDiv.style, {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#166534'
      });
      titleDiv.textContent = 'RFID Implementation Benefits';
      
      // Benefits grid
      const gridDiv = document.createElement('div');
      gridDiv.className = 'benefits-grid';
      Object.assign(gridDiv.style, {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px'
      });
      
      // Add benefit items to grid
      benefits.forEach(benefit => {
        const benefitDiv = document.createElement('div');
        benefitDiv.className = 'benefit-item';
        Object.assign(benefitDiv.style, {
          backgroundColor: 'white',
          borderLeft: '4px solid #16a34a',
          borderRadius: '4px',
          padding: '10px'
        });
        
        const benefitTitle = document.createElement('div');
        benefitTitle.className = 'benefit-title';
        Object.assign(benefitTitle.style, {
          fontWeight: 'bold',
          marginBottom: '4px'
        });
        benefitTitle.textContent = benefit.title;
        
        const benefitDesc = document.createElement('div');
        benefitDesc.className = 'benefit-description';
        Object.assign(benefitDesc.style, {
          fontSize: '13px'
        });
        benefitDesc.textContent = benefit.description;
        
        benefitDiv.appendChild(benefitTitle);
        benefitDiv.appendChild(benefitDesc);
        gridDiv.appendChild(benefitDiv);
      });
      
      // Add title and grid to panel
      panelDiv.appendChild(titleDiv);
      panelDiv.appendChild(gridDiv);
      
      return panelDiv;
    }
    
    console.log('[RFID Architecture] Component rendered successfully');
    
  } catch (error) {
    // Handle any errors that occur during rendering
    console.error('[RFID Architecture] Error rendering component:', error);
    
    // Display a user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    Object.assign(errorDiv.style, {
      padding: '15px',
      margin: '10px',
      backgroundColor: '#fff2f2',
      border: '1px solid #ffdddd',
      color: '#d8000c',
      borderRadius: '4px'
    });
    
    errorDiv.innerHTML = '<strong>Error:</strong> Could not render the RFID Architecture diagram.<br>Please check the browser console for more details.';
    
    // Find the container and append the error message
    const container = document.getElementById('rfid-architecture-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(errorDiv);
    }
  }
});