# PowerShell script to deploy to GitHub Pages

# Create clean build directory
Write-Host "Creating build directory..." -ForegroundColor Yellow
if (Test-Path -Path ".\build") {
    Remove-Item -Path ".\build\*" -Recurse -Force
} else {
    New-Item -Path ".\build" -ItemType Directory | Out-Null
}

# Copy all static sites to build folder
Write-Host "Copying site content to build folder..." -ForegroundColor Yellow
# Copy the main site content first
Copy-Item -Path ".\lean_six_sigma_site\*" -Destination ".\build\" -Recurse -Exclude "index.html" # Exclude root index if it exists to avoid conflict

# Copy specific sub-site folders if they exist within lean_six_sigma_site and need special handling or root placement in build
# Example: If value_stream_map should be at the root of the deployed site
if (Test-Path -Path ".\lean_six_sigma_site\define\value_stream_map") {
    Copy-Item -Path ".\lean_six_sigma_site\define\value_stream_map" -Destination ".\build\value_stream_map" -Recurse
}
if (Test-Path -Path ".\lean_six_sigma_site\define\process_flow_diagram") {
    Copy-Item -Path ".\lean_six_sigma_site\define\process_flow_diagram" -Destination ".\build\process_flow_diagram" -Recurse
}
if (Test-Path -Path ".\lean_six_sigma_site\improve\5s_app") {
    Copy-Item -Path ".\lean_six_sigma_site\improve\5s_app" -Destination ".\build\5s_app" -Recurse
}
if (Test-Path -Path ".\lean_six_sigma_site\improve\kanban_system") {
    Copy-Item -Path ".\lean_six_sigma_site\improve\kanban_system" -Destination ".\build\kanban_system" -Recurse
}

# Copy markdown reports and associated images from within lean_six_sigma_site
Write-Host "Copying markdown reports..." -ForegroundColor Yellow
# Analyze flow reports and plots
if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow") {
    if (-not (Test-Path -Path ".\build\analyze_flow")) {
        New-Item -Path ".\build\analyze_flow" -ItemType Directory | Out-Null
    }
    Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\*.md" -Destination ".\build\analyze_flow\"
    
    # Categorical plots
    if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\categorical_plots") {
        if (-not (Test-Path -Path ".\build\analyze_flow\categorical_plots")) {
            New-Item -Path ".\build\analyze_flow\categorical_plots" -ItemType Directory | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\categorical_plots\*" -Destination ".\build\analyze_flow\categorical_plots\"
    }
    
    # Continuous analysis output
    if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output") {
        if (-not (Test-Path -Path ".\build\analyze_flow\continuous_analysis_output")) {
            New-Item -Path ".\build\analyze_flow\continuous_analysis_output" -ItemType Directory | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output\*.md" -Destination ".\build\analyze_flow\continuous_analysis_output\"
        # Continuous plots
        if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output\plots") {
            if (-not (Test-Path -Path ".\build\analyze_flow\continuous_analysis_output\plots")) {
                New-Item -Path ".\build\analyze_flow\continuous_analysis_output\plots" -ItemType Directory | Out-Null
            }
            Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output\plots\*" -Destination ".\build\analyze_flow\continuous_analysis_output\plots\"
        }
    }
    
    # Root cause analysis output
    if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output") {
        if (-not (Test-Path -Path ".\build\analyze_flow\root_cause_analysis_output")) {
            New-Item -Path ".\build\analyze_flow\root_cause_analysis_output" -ItemType Directory | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\*.md" -Destination ".\build\analyze_flow\root_cause_analysis_output\"
        # Root cause plots
        if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\plots") {
            if (-not (Test-Path -Path ".\build\analyze_flow\root_cause_analysis_output\plots")) {
                New-Item -Path ".\build\analyze_flow\root_cause_analysis_output\plots" -ItemType Directory | Out-Null
            }
            Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\plots\*" -Destination ".\build\analyze_flow\root_cause_analysis_output\plots\"
        }
    }
}

# MSA reports and plots
if (Test-Path -Path ".\lean_six_sigma_site\measure\msa") {
    if (-not (Test-Path -Path ".\build\msa")) {
        New-Item -Path ".\build\msa" -ItemType Directory | Out-Null
    }
    Copy-Item -Path ".\lean_six_sigma_site\measure\msa\*.md" -Destination ".\build\msa\"
    # Copy MSA images if they exist
    if (Test-Path -Path ".\lean_six_sigma_site\measure\msa\*.png") {
         Copy-Item -Path ".\lean_six_sigma_site\measure\msa\*.png" -Destination ".\build\msa\"
    }
}

# Copy root level markdown files if any (e.g., README.md)
Copy-Item -Path ".\*.md" -Destination ".\build\"

# Create main index.html to link to different parts
Write-Host "Creating main index page..." -ForegroundColor Yellow
$indexContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lean Six Sigma Project - Sites Index</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #eaecee;
            padding-bottom: 10px;
        }
        .site-section {
            margin-bottom: 30px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        .site-link {
            margin-bottom: 10px;
        }
        .site-link a {
            display: inline-block;
            padding: 8px 15px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .site-link a:hover {
            background-color: #2980b9;
        }
        .description {
            margin-top: 5px;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <h1>Lean Six Sigma Project - Sites Index</h1>
    
    <div class="site-section">
        <h2>Main Project Site</h2>
        <div class="site-link">
            <a href="index.html">Lean Six Sigma Documentation Site</a> 
        </div>
        <p class="description">The main project documentation site with DMAIC phases and analysis reports.</p>
    </div>

    <div class="site-section">
        <h2>Tools and Analysis</h2>
        <div class="site-link">
            <a href="value_stream_map/index.html">Value Stream Map</a>
        </div>
        <p class="description">Interactive value stream mapping tool for process visualization and analysis.</p>

        <div class="site-link">
            <a href="process_flow_diagram/stocktake_process.html">Stocktake Process Flow Diagram</a>
        </div>
        <p class="description">Visual representation of the stocktake process flow.</p>
    </div>

    <div class="site-section">
        <h2>Interactive Applications</h2>
        <div class="site-link">
            <a href="5s_app/index.html">5S Management Application</a>
        </div>
        <p class="description">Tool for implementing and tracking 5S methodology.</p>

        <div class="site-link">
            <a href="kanban_system/index.html">Kanban System</a>
        </div>
        <p class="description">Kanban board for visual inventory management.</p>
    </div>

    <div class="site-section">
        <h2>Direct Report Access</h2>
        <div class="site-link">
            <a href="analyze/reports.html">Analysis Reports</a>
        </div>
        <p class="description">Direct access to all markdown analysis reports.</p>
    </div>
</body>
</html>
"@
# Note: Adjusted the main site link href in the indexContent above to point to the root index.html
$indexContent | Out-File -FilePath ".\build\index.html" -Encoding utf8

# Force git deployment
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Yellow

# Initialize a temporary git repo in the build folder
Set-Location -Path ".\build"
# Check if .git exists, remove if it does for a clean init
if (Test-Path -Path ".git" -PathType Container) {
    Remove-Item -Path ".git" -Recurse -Force
}
git init
git add .
git config --local user.email "deployment@example.com"
git config --local user.name "GitHub Pages Deployment Script"
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages branch
git push --force "https://github.com/Danik911/lean_six_sigma.git" master:gh-pages

# Clean up
Set-Location -Path ".."
Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Your site should be available at https://danik911.github.io/lean_six_sigma/" -ForegroundColor Green
Write-Host "Note: It may take a few minutes for changes to appear on GitHub Pages." -ForegroundColor Yellow