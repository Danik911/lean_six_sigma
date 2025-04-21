import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import os

# --- Configuration ---
# Define the path to the dataset relative to the script location or use an absolute path
script_dir = os.path.dirname(__file__) # Get the directory where the script is located
# Go up one level to the 'lean_six_sigma' directory
base_dir = os.path.dirname(script_dir)
csv_filename = 'simplepharma_inventory_analysis.csv'
csv_filepath = os.path.join(base_dir, csv_filename)

# Define output directory for plots and report
output_dir = os.path.join(script_dir, 'continuous_analysis_output')
plot_dir = os.path.join(output_dir, 'plots')
report_filename = os.path.join(output_dir, 'continuous_analysis_report.md')

# Create output directories if they don't exist
os.makedirs(plot_dir, exist_ok=True)

# --- Load Data ---
try:
    df = pd.read_csv(csv_filepath)
    print(f"Successfully loaded data from: {csv_filepath}")
    # Ensure 'Count_Accurate' is boolean
    if df['Count_Accurate'].dtype != 'bool':
        # Attempt conversion, handle potential errors if values aren't easily convertible
        try:
            # Example: Convert 'True'/'False' strings or 1/0 integers
            if df['Count_Accurate'].isin([0, 1]).all():
                 df['Count_Accurate'] = df['Count_Accurate'].astype(bool)
            elif df['Count_Accurate'].isin(['True', 'False']).all():
                 df['Count_Accurate'] = df['Count_Accurate'].map({'True': True, 'False': False}).astype(bool)
            else:
                 print("Warning: 'Count_Accurate' column has unexpected values. Analysis might be affected.")
        except Exception as conv_e:
            print(f"Error converting 'Count_Accurate' to boolean: {conv_e}")
            exit()

except FileNotFoundError:
    print(f"Error: The file '{csv_filename}' was not found at '{csv_filepath}'.")
    print("Please ensure the CSV file is in the correct directory.")
    exit()
except Exception as e:
    print(f"An error occurred while loading or processing the CSV file: {e}")
    exit()

# --- Analysis ---
continuous_vars = ['Actual_Quantity', 'Staff_Experience_Years', 'Count_Time_Seconds']

# Create a function to analyze relationship between continuous variable and accuracy
def analyze_continuous_relationship(df, var_name, plot_dir):
    """Analyzes and plots the relationship between a continuous variable and count accuracy."""
    plot_filename = os.path.join(plot_dir, f'{var_name}_boxplot.png')
    relative_plot_path = os.path.join(os.path.basename(plot_dir), f'{var_name}_boxplot.png') # Path relative to the report

    # Create box plots for each variable by count accuracy
    plt.figure(figsize=(10, 6))
    sns.boxplot(x='Count_Accurate', y=var_name, data=df)
    plt.title(f'Distribution of {var_name} by Count Accuracy')
    plt.ylabel(var_name)
    plt.xlabel('Count Accurate (False vs True)')
    plt.grid(True, axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig(plot_filename) # Save the plot
    plt.close() # Close the figure to free memory
    print(f"Saved plot: {plot_filename}")

    # T-test to compare means (handle potential NaN values)
    accurate = df.loc[df['Count_Accurate'] == True, var_name].dropna()
    inaccurate = df.loc[df['Count_Accurate'] == False, var_name].dropna()

    if len(accurate) < 2 or len(inaccurate) < 2:
        print(f"Warning: Not enough data points for t-test on {var_name}. Skipping.")
        t_stat, p_val = np.nan, np.nan
    else:
        t_stat, p_val = stats.ttest_ind(accurate, inaccurate, equal_var=False, nan_policy='omit')

    # Calculate means for each group
    mean_accurate = accurate.mean()
    mean_inaccurate = inaccurate.mean()

    return {
        'variable': var_name,
        't_statistic': t_stat,
        'p_value': p_val,
        'significant': p_val < 0.05 if not np.isnan(p_val) else False,
        'mean_accurate': mean_accurate,
        'mean_inaccurate': mean_inaccurate,
        'difference': mean_accurate - mean_inaccurate if not (np.isnan(mean_accurate) or np.isnan(mean_inaccurate)) else np.nan,
        'plot_path': relative_plot_path
    }

# Run analysis for continuous variables
cont_results = []
for var in continuous_vars:
    result = analyze_continuous_relationship(df, var, plot_dir)
    cont_results.append(result)

# Create summary DataFrame
cont_df = pd.DataFrame(cont_results)
print("\nContinuous Variable Analysis Results:")
print(cont_df[['variable', 't_statistic', 'p_value', 'mean_accurate', 'mean_inaccurate', 'significant']])

# --- Generate Markdown Report ---
report_content = f"""# Continuous Variable Analysis Report

This report examines the relationship between key continuous variables and inventory count accuracy based on the data in `{csv_filename}`.

Overall Average Accuracy: {df['Count_Accurate'].mean():.1%}

"""

for result in cont_results:
    report_content += f"""
## Analysis for: {result['variable']}

- **T-Test Results:**
    - T-Statistic: {result['t_statistic']:.3f}
    - P-Value: {result['p_value']:.4f}
    - **Statistically Significant (p < 0.05): {result['significant']}**
- **Mean Values:**
    - Mean ({result['variable']}) for Accurate Counts: {result['mean_accurate']:.2f}
    - Mean ({result['variable']}) for Inaccurate Counts: {result['mean_inaccurate']:.2f}
    - Difference (Accurate - Inaccurate): {result['difference']:.2f}

![Box plot for {result['variable']}]({result['plot_path']})

---
"""

report_content += """
## Summary Table

"""
# Format the DataFrame for Markdown
cont_df_markdown = cont_df[['variable', 't_statistic', 'p_value', 'mean_accurate', 'mean_inaccurate', 'significant']].copy()
cont_df_markdown['t_statistic'] = cont_df_markdown['t_statistic'].map('{:.3f}'.format)
cont_df_markdown['p_value'] = cont_df_markdown['p_value'].map('{:.4f}'.format)
cont_df_markdown['mean_accurate'] = cont_df_markdown['mean_accurate'].map('{:.2f}'.format)
cont_df_markdown['mean_inaccurate'] = cont_df_markdown['mean_inaccurate'].map('{:.2f}'.format)

report_content += cont_df_markdown.to_markdown(index=False)

# Write report to file
try:
    with open(report_filename, 'w') as f:
        f.write(report_content)
    print(f"\nSuccessfully generated Markdown report: {report_filename}")
except Exception as e:
    print(f"\nError writing Markdown report: {e}")