@echo off
echo Building site for GitHub Pages deployment...

:: Create build directory if it doesn't exist
if not exist build mkdir build

:: Clear build directory
del /q /s build\*

:: Copy lean_six_sigma_site to build (keeping the folder structure)
xcopy /E /I /Y lean_six_sigma_site build\lean_six_sigma_site

:: Copy value_stream_map to build
xcopy /E /I /Y value_stream_map build\value_stream_map

:: Copy process_flow_diagram to build
xcopy /E /I /Y process_flow_diagram build\process_flow_diagram

:: Copy 5s_app to build
xcopy /E /I /Y 5s_app build\5s_app

:: Copy kanban_system to build
xcopy /E /I /Y kanban_system build\kanban_system

:: Copy markdown reports for direct access
if not exist build\analyze_flow mkdir build\analyze_flow
copy /Y analyze_flow\*.md build\analyze_flow\

if not exist build\analyze_flow\continuous_analysis_output mkdir build\analyze_flow\continuous_analysis_output
copy /Y analyze_flow\continuous_analysis_output\*.md build\analyze_flow\continuous_analysis_output\

if not exist build\analyze_flow\root_cause_analysis_output mkdir build\analyze_flow\root_cause_analysis_output
copy /Y analyze_flow\root_cause_analysis_output\*.md build\analyze_flow\root_cause_analysis_output\

if not exist build\msa mkdir build\msa
copy /Y msa\*.md build\msa\

copy /Y *.md build\

:: Copy image folders for markdown files
if exist analyze_flow\categorical_plots xcopy /E /I /Y analyze_flow\categorical_plots build\analyze_flow\categorical_plots
if exist analyze_flow\continuous_analysis_output\plots xcopy /E /I /Y analyze_flow\continuous_analysis_output\plots build\analyze_flow\continuous_analysis_output\plots
if exist analyze_flow\root_cause_analysis_output\plots xcopy /E /I /Y analyze_flow\root_cause_analysis_output\plots build\analyze_flow\root_cause_analysis_output\plots

:: Create a new index.html in the build root that provides links to all sites
echo Creating main index page with links to all sites...
call :create_index_file

echo Build completed!
echo Run "npx gh-pages -d build" to deploy to GitHub Pages
exit /b 0

:create_index_file
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>Lean Six Sigma Project - Sites Index^</title^>
echo     ^<style^>
echo         body {
echo             font-family: Arial, sans-serif;
echo             line-height: 1.6;
echo             max-width: 800px;
echo             margin: 0 auto;
echo             padding: 20px;
echo         }
echo         h1 {
echo             color: #2c3e50;
echo             border-bottom: 2px solid #eaecee;
echo             padding-bottom: 10px;
echo         }
echo         .site-section {
echo             margin-bottom: 30px;
echo             padding: 15px;
echo             background-color: #f8f9fa;
echo             border-radius: 5px;
echo         }
echo         .site-link {
echo             margin-bottom: 10px;
echo         }
echo         .site-link a {
echo             display: inline-block;
echo             padding: 8px 15px;
echo             background-color: #3498db;
echo             color: white;
echo             text-decoration: none;
echo             border-radius: 4px;
echo             transition: background-color 0.3s;
echo         }
echo         .site-link a:hover {
echo             background-color: #2980b9;
echo         }
echo         .description {
echo             margin-top: 5px;
echo             color: #7f8c8d;
echo         }
echo     ^</style^>
echo ^</head^>
echo ^<body^>
echo     ^<h1^>Lean Six Sigma Project - Sites Index^</h1^>
echo     
echo     ^<div class="site-section"^>
echo         ^<h2^>Main Project Site^</h2^>
echo         ^<div class="site-link"^>
echo             ^<a href="lean_six_sigma_site/index.html"^>Lean Six Sigma Documentation Site^</a^>
echo         ^</div^>
echo         ^<p class="description"^>The main project documentation site with DMAIC phases and analysis reports.^</p^>
echo     ^</div^>
echo 
echo     ^<div class="site-section"^>
echo         ^<h2^>Tools and Analysis^</h2^>
echo         ^<div class="site-link"^>
echo             ^<a href="value_stream_map/index.html"^>Value Stream Map^</a^>
echo         ^</div^>
echo         ^<p class="description"^>Interactive value stream mapping tool for process visualization and analysis.^</p^>
echo 
echo         ^<div class="site-link"^>
echo             ^<a href="process_flow_diagram/stocktake_process.html"^>Stocktake Process Flow Diagram^</a^>
echo         ^</div^>
echo         ^<p class="description"^>Visual representation of the stocktake process flow.^</p^>
echo     ^</div^>
echo 
echo     ^<div class="site-section"^>
echo         ^<h2^>Interactive Applications^</h2^>
echo         ^<div class="site-link"^>
echo             ^<a href="5s_app/index.html"^>5S Management Application^</a^>
echo         ^</div^>
echo         ^<p class="description"^>Tool for implementing and tracking 5S methodology.^</p^>
echo 
echo         ^<div class="site-link"^>
echo             ^<a href="kanban_system/index.html"^>Kanban System^</a^>
echo         ^</div^>
echo         ^<p class="description"^>Kanban board for visual inventory management.^</p^>
echo     ^</div^>
echo 
echo     ^<div class="site-section"^>
echo         ^<h2^>Direct Report Access^</h2^>
echo         ^<div class="site-link"^>
echo             ^<a href="lean_six_sigma_site/analyze/reports.html"^>Analysis Reports^</a^>
echo         ^</div^>
echo         ^<p class="description"^>Direct access to all markdown analysis reports.^</p^>
echo     ^</div^>
echo ^</body^>
echo ^</html^>
) > build\index.html
exit /b 0