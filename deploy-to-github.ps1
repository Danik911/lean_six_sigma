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
# Copy the main site content first - including its index.html and all subdirectories
Copy-Item -Path ".\lean_six_sigma_site\*" -Destination ".\build\" -Recurse

# IMPORTANT: Explicitly copy the Value Stream Map directory to ensure it's properly updated
Write-Host "Explicitly copying Value Stream Map files..." -ForegroundColor Yellow
if (Test-Path -Path ".\lean_six_sigma_site\define\value_stream_map") {
    if (-not (Test-Path -Path ".\build\define\value_stream_map")) {
        New-Item -Path ".\build\define\value_stream_map" -ItemType Directory -Force | Out-Null
    }
    Copy-Item -Path ".\lean_six_sigma_site\define\value_stream_map\*" -Destination ".\build\define\value_stream_map\" -Force -Recurse
}

# Copy markdown reports and associated images from within lean_six_sigma_site
# This section remains as it handles specific file types and structures within analyze/ and measure/
Write-Host "Copying markdown reports..." -ForegroundColor Yellow
# Analyze flow reports and plots
if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow") {
    # Ensure target directory exists
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
        # NOTE: Corrected target path from build\analyze_flow to build\analyze\analyze_flow
        if (-not (Test-Path -Path ".\build\analyze\analyze_flow\root_cause_analysis_output")) { 
            New-Item -Path ".\build\analyze\analyze_flow\root_cause_analysis_output" -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\*.md" -Destination ".\build\analyze\analyze_flow\root_cause_analysis_output\" -Force
        # Root cause plots
        if (Test-Path -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\plots") {
             # NOTE: Corrected target path from build\analyze_flow to build\analyze\analyze_flow
            if (-not (Test-Path -Path ".\build\analyze\analyze_flow\root_cause_analysis_output\plots")) {
                New-Item -Path ".\build\analyze\analyze_flow\root_cause_analysis_output\plots" -ItemType Directory -Force | Out-Null
            }
            Copy-Item -Path ".\lean_six_sigma_site\analyze\analyze_flow\root_cause_analysis_output\plots\*" -Destination ".\build\analyze\analyze_flow\root_cause_analysis_output\plots\" -Recurse -Force
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

# ... rest of the script (git commands, etc.) ...
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