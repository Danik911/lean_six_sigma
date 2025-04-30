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
Copy-Item -Path ".\lean_six_sigma_site" -Destination ".\build\lean_six_sigma_site" -Recurse
Copy-Item -Path ".\value_stream_map" -Destination ".\build\value_stream_map" -Recurse
Copy-Item -Path ".\process_flow_diagram" -Destination ".\build\process_flow_diagram" -Recurse
Copy-Item -Path ".\5s_app" -Destination ".\build\5s_app" -Recurse
Copy-Item -Path ".\kanban_system" -Destination ".\build\kanban_system" -Recurse

# Copy markdown reports
Write-Host "Copying markdown reports..." -ForegroundColor Yellow
if (-not (Test-Path -Path ".\build\analyze_flow")) {
    New-Item -Path ".\build\analyze_flow" -ItemType Directory | Out-Null
}
Copy-Item -Path ".\analyze_flow\*.md" -Destination ".\build\analyze_flow\"

if (-not (Test-Path -Path ".\build\analyze_flow\continuous_analysis_output")) {
    New-Item -Path ".\build\analyze_flow\continuous_analysis_output" -ItemType Directory | Out-Null
}
Copy-Item -Path ".\analyze_flow\continuous_analysis_output\*.md" -Destination ".\build\analyze_flow\continuous_analysis_output\"

if (-not (Test-Path -Path ".\build\analyze_flow\root_cause_analysis_output")) {
    New-Item -Path ".\build\analyze_flow\root_cause_analysis_output" -ItemType Directory | Out-Null
}
Copy-Item -Path ".\analyze_flow\root_cause_analysis_output\*.md" -Destination ".\build\analyze_flow\root_cause_analysis_output\"

if (-not (Test-Path -Path ".\build\msa")) {
    New-Item -Path ".\build\msa" -ItemType Directory | Out-Null
}
Copy-Item -Path ".\msa\*.md" -Destination ".\build\msa\"

Copy-Item -Path ".\*.md" -Destination ".\build\"

# Copy image folders for markdown files
if (Test-Path -Path ".\analyze_flow\categorical_plots") {
    if (-not (Test-Path -Path ".\build\analyze_flow\categorical_plots")) {
        New-Item -Path ".\build\analyze_flow\categorical_plots" -ItemType Directory | Out-Null
    }
    Copy-Item -Path ".\analyze_flow\categorical_plots\*" -Destination ".\build\analyze_flow\categorical_plots\"
}

if (Test-Path -Path ".\analyze_flow\continuous_analysis_output\plots") {
    if (-not (Test-Path -Path ".\build\analyze_flow\continuous_analysis_output\plots")) {
        New-Item -Path ".\build\analyze_flow\continuous_analysis_output\plots" -ItemType Directory | Out-Null
    }
    Copy-Item -Path ".\analyze_flow\continuous_analysis_output\plots\*" -Destination ".\build\analyze_flow\continuous_analysis_output\plots\"
}

if (Test-Path -Path ".\analyze_flow\root_cause_analysis_output\plots") {
    if (-not (Test-Path -Path ".\build\analyze_flow\root_cause_analysis_output\plots")) {
        New-Item -Path ".\build\analyze_flow\root_cause_analysis_output\plots" -ItemType Directory | Out-Null
    }
    Copy-Item -Path ".\analyze_flow\root_cause_analysis_output\plots\*" -Destination ".\build\analyze_flow\root_cause_analysis_output\plots\"
}

# Create main index.html with redirect
Write-Host "Creating main index page with redirect..." -ForegroundColor Yellow
$indexContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=lean_six_sigma_site/index.html">
    <title>Lean Six Sigma Project</title>
</head>
<body>
    <p>If you are not redirected automatically, follow this <a href="lean_six_sigma_site/index.html">link to the Lean Six Sigma Project</a>.</p>
</body>
</html>
"@
$indexContent | Out-File -FilePath ".\build\index.html" -Encoding utf8

# Force git deployment
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Yellow

# Initialize a temporary git repo in the build folder
Set-Location -Path ".\build"
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