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
# Copy the main site content first - including its index.html
Copy-Item -Path ".\lean_six_sigma_site\*" -Destination ".\build\" -Recurse

# Copy specific sub-site folders if they exist within lean_six_sigma_site and need special handling or root placement in build
# Ensure these are copied *after* the main site content if there's any potential overlap,
# or adjust paths if they should be merged into existing directories from the main site copy.
# Assuming they should be top-level directories in the build folder:
if (Test-Path -Path ".\lean_six_sigma_site\define\value_stream_map") {
    Copy-Item -Path ".\lean_six_sigma_site\define\value_stream_map" -Destination ".\build\value_stream_map" -Recurse -Force # Use -Force to overwrite if needed
}
if (Test-Path -Path ".\lean_six_sigma_site\define\process_flow_diagram") {
    Copy-Item -Path ".\lean_six_sigma_site\define\process_flow_diagram" -Destination ".\build\process_flow_diagram" -Recurse -Force
}
if (Test-Path -Path ".\lean_six_sigma_site\improve\5s_app") {
    Copy-Item -Path ".\lean_six_sigma_site\improve\5s_app" -Destination ".\build\5s_app" -Recurse -Force
}
if (Test-Path -Path ".\lean_six_sigma_site\improve\kanban_system") {
    Copy-Item -Path ".\lean_six_sigma_site\improve\kanban_system" -Destination ".\build\kanban_system" -Recurse -Force
}

# Copy markdown reports and associated images from within lean_six_sigma_site
Write-Host "Copying markdown reports..." -ForegroundColor Yellow
# Analyze flow reports and plots
if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow") {
    # Ensure target directory exists (it should from the initial copy, but check just in case)
    if (-not (Test-Path -Path ".\build\analyze\analyze_flow")) {
        New-Item -Path ".\build\analyze\analyze_flow" -ItemType Directory -Force | Out-Null
    }
    # Copy MD files
    Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\*.md" -Destination ".\build\analyze\analyze_flow\" -Force
    
    # Categorical plots
    if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\categorical_plots") {
        if (-not (Test-Path -Path ".\build\analyze\analyze_flow\categorical_plots")) {
            New-Item -Path ".\build\analyze\analyze_flow\categorical_plots" -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\categorical_plots\*" -Destination ".\build\analyze\analyze_flow\categorical_plots\" -Recurse -Force
    }
    
    # Continuous analysis output
    if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output") {
        if (-not (Test-Path -Path ".\build\analyze\analyze_flow\continuous_analysis_output")) {
            New-Item -Path ".\build\analyze\analyze_flow\continuous_analysis_output" -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output\*.md" -Destination ".\build\analyze\analyze_flow\continuous_analysis_output\" -Force
        # Continuous plots
        if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output\plots") {
            if (-not (Test-Path -Path ".\build\analyze\analyze_flow\continuous_analysis_output\plots")) {
                New-Item -Path ".\build\analyze\analyze_flow\continuous_analysis_output\plots" -ItemType Directory -Force | Out-Null
            }
            Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\continuous_analysis_output\plots\*" -Destination ".\build\analyze\analyze_flow\continuous_analysis_output\plots\" -Recurse -Force
        }
    }
    
    # Root cause analysis output
    if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output") {
        if (-not (Test-Path -Path ".\build\analyze_flow\root_cause_analysis_output")) {
            New-Item -Path ".\build\analyze_flow\root_cause_analysis_output" -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\*.md" -Destination ".\build\analyze_flow\root_cause_analysis_output\" -Force
        # Root cause plots
        if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\plots") {
            if (-not (Test-Path -Path ".\build\analyze_flow\root_cause_analysis_output\plots")) {
                New-Item -Path ".\build\analyze_flow\root_cause_analysis_output\plots" -ItemType Directory -Force | Out-Null
            }
            Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\plots\*" -Destination ".\build\analyze_flow\root_cause_analysis_output\plots\" -Recurse -Force
        }
    }
}

# MSA reports and plots
if (Test-Path -Path ".\lean_six_sigma_site\measure\msa") {
    if (-not (Test-Path -Path ".\build\measure\msa")) {
        New-Item -Path ".\build\measure\msa" -ItemType Directory -Force | Out-Null
    }
    Copy-Item -Path ".\lean_six_sigma_site\measure\msa\*.md" -Destination ".\build\measure\msa\" -Force
    # Copy MSA images if they exist
    if (Test-Path -Path ".\lean_six_sigma_site\measure\msa\*.png") {
         Copy-Item -Path ".\lean_six_sigma_site\measure\msa\*.png" -Destination ".\build\measure\msa\" -Force
    }
}

# Copy root level markdown files if any (e.g., README.md from project root)
Copy-Item -Path ".\*.md" -Destination ".\build\" -Force

# REMOVED: Create main index.html to link to different parts
# The index.html from lean_six_sigma_site should now be the main entry point.
# Ensure that lean_six_sigma_site/index.html contains the necessary links
# to value_stream_map, process_flow_diagram, 5s_app, kanban_system, and reports.

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