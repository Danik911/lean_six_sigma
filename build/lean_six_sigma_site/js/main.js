/**
 * Main JavaScript file for Lean Six Sigma project website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if the function exists
    if (typeof initTooltips === 'function') {
        initTooltips();
    }
    
    // Check if there are any markdown links to enhance
    enhanceMarkdownLinks();
    
    // Initialize any dashboard components
    initializeDashboards();
});

/**
 * Enhances markdown links to open in the markdown viewer
 */
function enhanceMarkdownLinks() {
    // Find all links to markdown files
    const mdLinks = document.querySelectorAll('a[href$=".md"]');
    
    mdLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the path to the markdown file
            const mdPath = this.getAttribute('href');
            
            // Check if we're in the analyze section
            if (window.location.pathname.includes('/analyze/')) {
                // We're already in analyze, just redirect to the reports page with the proper parameter
                e.preventDefault();
                window.location.href = 'reports.html?report=' + encodeURIComponent(mdPath.split('/').pop().replace('.md', ''));
            } else {
                // We're not in analyze, redirect to the analyze/reports page
                e.preventDefault();
                window.location.href = 'analyze/reports.html?report=' + encodeURIComponent(mdPath.split('/').pop().replace('.md', ''));
            }
        });
    });
}

/**
 * Initializes dashboard components if they exist
 */
function initializeDashboards() {
    // Check if there are any dashboard containers
    const dashboards = document.querySelectorAll('.dashboard-container');
    
    if (dashboards.length === 0) return;
    
    // Load dashboard data
    dashboards.forEach(dashboard => {
        const dataSource = dashboard.getAttribute('data-source');
        if (dataSource) {
            loadDashboardData(dashboard, dataSource);
        }
    });
}

/**
 * Loads data for a dashboard from a specified source
 */
function loadDashboardData(dashboardElement, dataSource) {
    fetch(dataSource)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load dashboard data');
            }
            return response.json();
        })
        .then(data => {
            renderDashboard(dashboardElement, data);
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
            dashboardElement.innerHTML = `
                <div class="error-message">
                    <p>Error loading dashboard data. ${error.message}</p>
                </div>
            `;
        });
}

/**
 * Renders dashboard data in the specified container
 */
function renderDashboard(dashboardElement, data) {
    // Check dashboard type
    const dashboardType = dashboardElement.getAttribute('data-type');
    
    switch(dashboardType) {
        case 'metrics':
            renderMetricsDashboard(dashboardElement, data);
            break;
        case 'progress':
            renderProgressDashboard(dashboardElement, data);
            break;
        default:
            // Generic dashboard rendering
            dashboardElement.innerHTML = '<p>Dashboard loaded successfully.</p>';
    }
}

/**
 * Renders a metrics dashboard
 */
function renderMetricsDashboard(container, data) {
    // Implementation would depend on your specific needs
    // This is a placeholder
    let html = '<div class="metrics-grid">';
    
    if (data.metrics) {
        data.metrics.forEach(metric => {
            html += `
                <div class="metric-card">
                    <h4>${metric.name}</h4>
                    <div class="metric-value">${metric.value}</div>
                    <div class="metric-trend ${metric.trend > 0 ? 'positive' : metric.trend < 0 ? 'negative' : 'neutral'}">
                        ${metric.trend > 0 ? '↑' : metric.trend < 0 ? '↓' : '→'} ${Math.abs(metric.trend)}%
                    </div>
                </div>
            `;
        });
    }
    
    html += '</div>';
    container.innerHTML = html;
}

/**
 * Renders a progress dashboard
 */
function renderProgressDashboard(container, data) {
    // Implementation would depend on your specific needs
    // This is a placeholder
    let html = '<div class="progress-container">';
    
    if (data.milestones) {
        html += '<div class="milestone-timeline">';
        data.milestones.forEach(milestone => {
            const isComplete = milestone.status === 'complete';
            const isActive = milestone.status === 'in-progress';
            
            html += `
                <div class="milestone ${isComplete ? 'complete' : isActive ? 'active' : ''}">
                    <div class="milestone-marker"></div>
                    <div class="milestone-content">
                        <h4>${milestone.name}</h4>
                        <p>${milestone.description}</p>
                        <div class="milestone-date">${milestone.date}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
}