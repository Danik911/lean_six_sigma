# SimplePharma Lean Six Sigma Project

![Lean Six Sigma](https://img.shields.io/badge/Lean%20Six%20Sigma-DMAIC-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📋 Project Overview

This Lean Six Sigma project focuses on improving inventory accuracy processes at SimplePharma, a pharmaceutical distribution company facing challenges with inventory discrepancies. The company has been experiencing inconsistencies between system records and physical counts, leading to supply chain disruptions, customer dissatisfaction, and regulatory compliance concerns.

The project follows the DMAIC methodology (Define, Measure, Analyze, Improve, Control) to systematically identify root causes of inventory discrepancies and implement sustainable solutions. This web-based documentation site provides a comprehensive walkthrough of the entire improvement process, complete with interactive tools, data visualizations, and detailed reports.

## 🔍 DMAIC Methodology Explained

This project is structured around the five phases of the DMAIC methodology:

### 1. Define

The Define phase establishes the scope, goals, and deliverables of the project. Key elements include:

- Project charter outlining objectives and business case
- SIPOC diagram mapping the process context
- Value Stream Map visualization
- Process Flow Diagram showing detailed workflow
- Stakeholder analysis and Voice of the Customer capture

### 2. Measure

The Measure phase focuses on gathering baseline data about current process performance:

- Measurement System Analysis (MSA) to validate data collection methods
- Data Collection Plan documenting what, how, when, and who
- Sample size determination using statistical methods
- Baseline performance metrics (76.50% accuracy, well below the target of 99%)
- Process capability analysis and sigma level calculation (2.4 sigma)

### 3. Analyze

The Analyze phase examines data to identify root causes of inventory discrepancies:

- Statistical analysis of key factors (training level, count method, location)
- Root cause analysis using tools like fishbone diagrams
- Hypothesis testing to validate suspected causes
- Data visualization to identify patterns and trends
- Detailed analysis reports with statistical findings

Our analysis revealed that discrepancies cluster around specific:
- Product types (high-value items)
- Locations (cold storage areas with 26.5% discrepancy rate)
- Times (end-of-month periods)
- Staff roles (temporary staff)

The data also showed concerning patterns:
- 18.2% overall discrepancy rate
- 23% variance in high-value pharmaceuticals
- Significant financial impact

### 4. Improve

The Improve phase develops and implements solutions to address root causes:

- Value Stream Mapping to identify waste and opportunities
- Solution Selection Matrix to evaluate potential improvements
- RFID Implementation Design for automated tracking
- 5S Implementation for workplace organization
- Standardized Training Program development
- Cycle Counting Redesign for more frequent, smaller counts

### 5. Control

The Control phase ensures that improvements are sustained over time:

- Statistical Process Control (SPC) with control charts
- Comprehensive Control Plan documenting monitoring procedures
- Standard Operating Procedures (SOPs) for consistent execution
- Competency Management through ongoing training
- Audit program for regular verification of adherence

## 🏗️ Project Structure

The project is organized into directories representing each phase of the DMAIC methodology:

```
lean_six_sigma_site/
├── index.html              # Main project landing page
├── css/                    # Styling files
├── js/                     # JavaScript functionality
├── define/                 # Define phase artifacts
├── measure/                # Measure phase artifacts
├── analyze/                # Analyze phase artifacts
├── improve/                # Improve phase artifacts
└── control/                # Control phase artifacts
```

## ✨ Key Features

- **Interactive Process Visualizations**: Dynamic value stream maps and process flow diagrams that visualize the inventory management process.
- **Statistical Analysis Tools**: Integration of data analysis methodologies for root cause identification.
- **Interactive Report Viewer**: Analysis reports with visualizations and statistical findings.
- **5S Digital Organization System**: A digital tool demonstrating workplace organization through visual aids.
- **Digital Kanban System**: A pull-based approach to inventory management with automated replenishment triggers.
- **RFID Implementation Visualization**: Design specification for RFID technology integration with warehouse management.
- **Control Chart Templates**: SPC monitoring tools for sustained performance.
- **Visual Management Boards**: Digital representations of metrics tracking systems.

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Basic understanding of Lean Six Sigma concepts (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Danik911/lean_six_sigma.git
```

2. Navigate to the project directory:
```bash
cd lean_six_sigma
```

3. Open the main landing page in your browser:
```bash
# Windows
start lean_six_sigma_site/index.html

# macOS
open lean_six_sigma_site/index.html

# Linux
xdg-open lean_six_sigma_site/index.html
```

## 📖 Usage Guide

1. **Project Navigation**: Use the top navigation bar to move between DMAIC phases (Define, Measure, Analyze, Improve, Control).

2. **Interactive Tools**:
   - Click on the "Value Stream Map" in the Define phase to explore the inventory process flow.
   - Use the "Interactive Report Viewer" in the Analyze phase to examine statistical findings.
   - Explore the "5S Digital Organization System" and "Digital Kanban System" in the Improve phase.

3. **Viewing Artifacts**:
   - Click on document links to open project artifacts like the SIPOC Diagram or Project Charter.
   - Toggle code and text content visibility using the provided buttons.

4. **Data Exploration**:
   - Review baseline performance metrics in the Measure phase.
   - Examine root cause analysis in the Analyze phase.
   - Review implementation results in the Improve phase.
   - Check the control mechanisms in the Control phase.

## 📈 Results and Impact

Six months after implementing the improvements:

- **Inventory Accuracy**: Improved from 76.50% to 97%
- **Process Sigma Level**: Enhanced from 2.4σ to 4.1σ
- **Annual Savings**: $175,000 with an ROI of 320%
- **Staff Satisfaction**: Increased from 45% to 85%

Key improvements included:
- 28% reduction in motion waste
- 62% fewer equipment issues
- 18% better space utilization
- 22% time saved in inventory activities

## 🔧 Technologies Used

- **HTML5**: Structure of the documentation site
- **CSS3**: Styling and responsive design
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons and visual elements
- **Highlight.js**: Code syntax highlighting
- **Marked.js**: Markdown parsing for reports
- **Chart.js**: Data visualizations (implied)

## 🤝 Contributing

This project was developed as an educational assignment. However, if you'd like to use it as a basis for your own Lean Six Sigma project:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-improvement`
3. Commit your changes: `git commit -m 'Add some amazing improvement'`
4. Push to the branch: `git push origin feature/amazing-improvement`
5. Open a Pull Request

## 📄 License

This project is available for educational purposes. Please respect the original work by providing attribution when reusing or referencing this material.

## 👏 Acknowledgements

- Developed by Daniil Vladimirov (Student Number: 3154227)
- Created for the Lean Sigma 4.0 assignment: "Utilise technology and principles of Lean Thinking and Six Sigma to improve a conceptual digitalisation of a business."

## 📞 Contact

For questions or feedback regarding this project, please open an issue on the [GitHub repository](https://github.com/Danik911/lean_six_sigma).