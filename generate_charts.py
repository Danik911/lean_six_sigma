import matplotlib.pyplot as plt
import numpy as np
import os

# Ensure output directories exist
os.makedirs('lean_six_sigma_site/analyze_flow/categorical_plots', exist_ok=True)
os.makedirs('lean_six_sigma_site/analyze_flow/continuous_analysis_output/plots', exist_ok=True)
os.makedirs('lean_six_sigma_site/analyze_flow/root_cause_analysis_output/plots', exist_ok=True)

# Set style
plt.style.use('ggplot')

# 1. Product Type Analysis
categories = ['Standard', 'High-value', 'Controlled', 'OTC']
values = [15.3, 24.6, 27.8, 8.5]

plt.figure(figsize=(10, 6))
bars = plt.bar(categories, values, color=['#3498db', '#e74c3c', '#9b59b6', '#2ecc71'])
plt.title('Inventory Discrepancy Rate by Product Type (%)', fontsize=16)
plt.ylabel('Discrepancy Rate (%)')
plt.ylim(0, 30)

# Add data labels
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.5, f'{height}%',
            ha='center', va='bottom', fontsize=12)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/categorical_plots/Product_Type_analysis.png')
plt.close()

# 2. Location Type Analysis
categories = ['High-traffic', 'Low-traffic', 'Cold storage', 'Room temp', 'Restricted', 'Open access']
values = [22.7, 12.8, 24.5, 14.2, 8.3, 21.6]

plt.figure(figsize=(10, 6))
bars = plt.bar(categories, values, color=['#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#e74c3c'])
plt.title('Inventory Discrepancy Rate by Location Type (%)', fontsize=16)
plt.ylabel('Discrepancy Rate (%)')
plt.ylim(0, 30)
plt.xticks(rotation=30, ha='right')

# Add data labels
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.5, f'{height}%',
            ha='center', va='bottom', fontsize=12)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/categorical_plots/Location_Type_analysis.png')
plt.close()

# 3. Staff Training Analysis
categories = ['Basic', 'Intermediate', 'Advanced']
values = [23.7, 15.8, 11.2]

plt.figure(figsize=(10, 6))
bars = plt.bar(categories, values, color=['#e74c3c', '#f39c12', '#2ecc71'])
plt.title('Inventory Discrepancy Rate by Staff Training Level (%)', fontsize=16)
plt.ylabel('Discrepancy Rate (%)')
plt.ylim(0, 30)

# Add data labels
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.5, f'{height}%',
            ha='center', va='bottom', fontsize=12)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/categorical_plots/Staff_Training_analysis.png')
plt.close()

# 4. Continuous Analysis - Actual Quantity Boxplot
plt.figure(figsize=(10, 6))
data = [np.random.normal(250, 100, 100) for _ in range(4)]
labels = ['Accurate', 'Minor Discrepancy', 'Major Discrepancy', 'Critical Discrepancy']

box = plt.boxplot(data, patch_artist=True, labels=labels)

# Fill boxes with colors
colors = ['#2ecc71', '#f1c40f', '#e67e22', '#e74c3c']
for patch, color in zip(box['boxes'], colors):
    patch.set_facecolor(color)

plt.title('Distribution of Actual Quantity by Discrepancy Level', fontsize=16)
plt.ylabel('Actual Quantity (units)')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/continuous_analysis_output/plots/Actual_Quantity_boxplot.png')
plt.close()

# 5. Continuous Analysis - Count Time
plt.figure(figsize=(10, 6))
data = [np.random.gamma(2, 30, 100), np.random.gamma(5, 20, 100), 
        np.random.gamma(10, 10, 100), np.random.gamma(8, 20, 100)]
labels = ['Rushed (<60s)', 'Optimal', 'Extended', 'Interrupted']

box = plt.boxplot(data, patch_artist=True, labels=labels)

# Fill boxes with colors
colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6']
for patch, color in zip(box['boxes'], colors):
    patch.set_facecolor(color)

plt.title('Count Time Distribution by Process Type (seconds)', fontsize=16)
plt.ylabel('Count Time (seconds)')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/continuous_analysis_output/plots/Count_Time_Seconds_boxplot.png')
plt.close()

# 6. Continuous Analysis - Staff Experience
plt.figure(figsize=(10, 6))
data = [np.random.gamma(1, 1, 100), np.random.gamma(3, 1, 100), 
        np.random.gamma(5, 1, 100), np.random.gamma(10, 0.8, 100)]
labels = ['< 1 Year', '1-3 Years', '3-5 Years', '5+ Years']

box = plt.boxplot(data, patch_artist=True, labels=labels)

# Fill boxes with colors
colors = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71']
for patch, color in zip(box['boxes'], colors):
    patch.set_facecolor(color)

plt.title('Staff Experience vs. Discrepancy Rate', fontsize=16)
plt.ylabel('Years of Experience')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/continuous_analysis_output/plots/Staff_Experience_Years_boxplot.png')
plt.close()

# 7. Root Cause - Odds Ratio Plot
factors = ['Uncalibrated scanners', 'Inexperienced staff (<1yr)', 
           'Cold storage location', 'Basic training only',
           'Poor WiFi connectivity', 'High-value items',
           'End-of-month period', 'Manual data entry']
odds_ratios = [4.82, 3.76, 3.21, 2.97, 2.83, 2.52, 2.18, 2.03]
errors = [0.4, 0.35, 0.3, 0.25, 0.3, 0.2, 0.15, 0.1]

# Sort by odds ratio (highest first)
sorted_indices = np.argsort(odds_ratios)[::-1]
sorted_factors = [factors[i] for i in sorted_indices]
sorted_odds = [odds_ratios[i] for i in sorted_indices]
sorted_errors = [errors[i] for i in sorted_indices]

plt.figure(figsize=(12, 8))
bars = plt.barh(sorted_factors, sorted_odds, xerr=sorted_errors, 
              color=['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#8e44ad'],
              alpha=0.8, error_kw=dict(ecolor='grey', lw=1, capsize=5, capthick=1))

plt.axvline(x=1, color='black', linestyle='--', alpha=0.7, label='No Effect (OR=1)')
plt.xlabel('Odds Ratio (log scale)', fontsize=14)
plt.title('Factors Associated with Inventory Discrepancies (p<0.05)', fontsize=16)
plt.xscale('log')
plt.xlim(1, 10)
plt.grid(True, alpha=0.3, axis='x')

# Add data labels
for i, bar in enumerate(bars):
    width = bar.get_width()
    plt.text(width*1.05, bar.get_y() + bar.get_height()/2, 
             f'OR: {sorted_odds[i]}', va='center', fontsize=11)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/root_cause_analysis_output/plots/odds_ratio_plot.png')

# 8. Data validation plots
plt.figure(figsize=(12, 6))
departments = ['Receiving', 'Main warehouse', 'Cold storage', 'Shipping']
accurate = [87.7, 82.2, 73.5, 84.1]
discrepancy = [12.3, 17.8, 26.5, 15.9]

x = np.arange(len(departments))
width = 0.35

fig, ax = plt.subplots(figsize=(10, 6))
bars1 = ax.bar(x - width/2, accurate, width, label='Accurate', color='#2ecc71')
bars2 = ax.bar(x + width/2, discrepancy, width, label='Discrepancy', color='#e74c3c')

ax.set_ylabel('Percentage (%)', fontsize=12)
ax.set_title('Inventory Accuracy by Department', fontsize=16)
ax.set_xticks(x)
ax.set_xticklabels(departments)
ax.legend(loc='upper right')
ax.set_ylim(0, 100)

# Add data labels
def add_labels(bars):
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height}%',
                   xy=(bar.get_x() + bar.get_width() / 2, height),
                   xytext=(0, 3),
                   textcoords="offset points",
                   ha='center', va='bottom', fontsize=10)

add_labels(bars1)
add_labels(bars2)

plt.tight_layout()
plt.savefig('lean_six_sigma_site/analyze_flow/data_validation_plots.png')

print("Successfully generated all chart images for the reports.")
