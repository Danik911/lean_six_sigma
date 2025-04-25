import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import os

# --- Configuration ---
# Create a directory for saving plots if it doesn't exist
script_dir = os.path.dirname(__file__)
plot_dir = os.path.join(script_dir, 'categorical_plots')
os.makedirs(plot_dir, exist_ok=True)
report_filename = "categorical_analysis_report.md"
report_filepath = os.path.join(script_dir, report_filename)

# --- Load the dataset ---
try:
    # Assuming the CSV is in the parent directory relative to the script
    csv_path = os.path.join(script_dir, '..', 'simplepharma_inventory_analysis.csv')
    df = pd.read_csv(csv_path)
    print(f"Loaded dataset from: {csv_path}")
except FileNotFoundError:
    print(f"Error: Could not find the dataset at {csv_path}")
    # Attempt to load from the current working directory as a fallback
    try:
        df = pd.read_csv('simplepharma_inventory_analysis.csv')
        print("Loaded dataset from the current working directory.")
    except FileNotFoundError:
        print("Error: Could not find the dataset in the current working directory either. Exiting.")
        exit()

# --- Analysis Function ---
def analyze_categorical_relationship(df, factor_var, plot_dir):
    """
    Performs Chi-Square test, calculates accuracy, generates plots, and saves them.

    Args:
        df (pd.DataFrame): The input DataFrame.
        factor_var (str): The categorical variable to analyze against 'Count_Accurate'.
        plot_dir (str): The directory to save the generated plots.

    Returns:
        dict: A dictionary containing analysis results and the plot filename.
              Returns None if the factor_var is not in the DataFrame.
    """
    if factor_var not in df.columns:
        print(f"Warning: Factor '{factor_var}' not found in DataFrame. Skipping.")
        return None

    # Create a contingency table
    contingency = pd.crosstab(df[factor_var], df['Count_Accurate'])

    # Run Chi-Square test only if there are expected frequencies > 5
    # (or handle potential warnings/errors if assumptions aren't met)
    try:
        chi2, p, dof, expected = stats.chi2_contingency(contingency)
        chi_square_text = f'Chi-Square Test: χ²={chi2:.2f}, p-value={p:.6f}'
        significant = p < 0.05
    except ValueError as e:
        # Handle cases where chi-square cannot be computed (e.g., all values in a row/column are 0)
        print(f"Warning: Could not compute Chi-Square for {factor_var}. Error: {e}")
        chi2, p, significant = np.nan, np.nan, np.nan
        chi_square_text = 'Chi-Square Test: Not computable'


    # Calculate accuracy percentages
    accuracy_by_factor = df.groupby(factor_var)['Count_Accurate'].mean() * 100

    # --- Plotting ---
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6)) # Increased figure size slightly

    # Plot count distribution
    contingency.plot(kind='bar', stacked=True, ax=ax1)
    ax1.set_title(f'Count Distribution by {factor_var}')
    ax1.set_ylabel('Count')
    ax1.tick_params(axis='x', rotation=45)
    ax1.legend(title='Count Accurate')

    # Plot accuracy percentage
    accuracy_by_factor.plot(kind='bar', ax=ax2, color='seagreen')
    ax2.set_title(f'Accuracy Percentage by {factor_var}')
    ax2.set_ylabel('Accuracy %')
    ax2.axhline(y=df['Count_Accurate'].mean()*100, color='red', linestyle='--',
                label=f'Overall Average: {df["Count_Accurate"].mean()*100:.1f}%')
    ax2.legend()
    ax2.tick_params(axis='x', rotation=45)

    # Set y-axis range for accuracy plot
    ax2.set_ylim([0, 100])

    # Add overall title and adjust layout
    fig.suptitle(f'Analysis of Count Accuracy by {factor_var}', fontsize=16, y=1.02)
    plt.figtext(0.5, 0.01, chi_square_text, ha='center', fontsize=11,
                bbox=dict(boxstyle='round,pad=0.3', fc='lightgray', alpha=0.5))

    # Adjust layout to prevent overlap - increased bottom margin
    plt.tight_layout(rect=[0, 0.05, 1, 0.98]) # Adjust rect to make space for figtext and suptitle

    # Save the plot
    plot_filename = f"{factor_var}_analysis.png"
    plot_filepath = os.path.join(plot_dir, plot_filename)
    try:
        plt.savefig(plot_filepath, bbox_inches='tight')
        print(f"Saved plot: {plot_filepath}")
    except Exception as e:
        print(f"Error saving plot {plot_filepath}: {e}")
        plot_filename = None # Indicate plot saving failed

    plt.close(fig) # Close the figure to free memory

    return {
        'factor': factor_var,
        'chi2': chi2,
        'p_value': p,
        'significant': significant,
        'accuracy_by_category': accuracy_by_factor.to_dict(),
        'plot_filename': plot_filename # Return filename for report
    }

# --- Main Execution ---

# Factors to analyze (ensure these columns exist in your CSV)
factors = ['Staff_Training', 'Staff_Role', 'Product_Type', 'Location_Type',
           'Count_Method', 'Scanner_Calibrated', 'Time_of_Day', 'End_of_Month',
           'WiFi_Strength', 'Scanner_Battery'] # Add or remove factors as needed

# --- Run analysis and generate report content ---
results = []
report_content = ["# Categorical Analysis Report\n"]
report_content.append("This report analyzes the relationship between various categorical factors and inventory count accuracy.")
report_content.append(f"Overall Average Accuracy: {df['Count_Accurate'].mean()*100:.1f}%\n")


for factor in factors:
    result = analyze_categorical_relationship(df, factor, plot_dir)
    if result: # Only process if analysis was successful
        results.append(result)
        report_content.append(f"\n## Analysis for: {factor}\n")
        report_content.append(f"- **Chi-Square Test:** χ²={result['chi2']:.2f}, p-value={result['p_value']:.6f}")
        report_content.append(f"- **Statistically Significant (p < 0.05):** {result['significant']}\n")
        if result['plot_filename']:
             # Use relative path for Markdown link
            relative_plot_path = os.path.join(os.path.basename(plot_dir), result['plot_filename'])
            report_content.append(f"![Analysis plot for {factor}]({relative_plot_path})\n")
        else:
            report_content.append("*Plot generation failed.*\n")

# --- Create and add summary table to report ---
if results:
    result_df = pd.DataFrame(results)
    result_df = result_df.sort_values('p_value')
    summary_table = result_df[['factor', 'chi2', 'p_value', 'significant']].to_markdown(index=False)

    report_content.append("\n## Chi-Square Test Results Summary\n")
    report_content.append("(Sorted by p-value)\n")
    report_content.append(summary_table)
else:
    report_content.append("\n## No results generated.")


# --- Save Report to File ---
try:
    # Specify UTF-8 encoding to handle special characters like χ
    with open(report_filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_content))
    print(f"\nMarkdown report saved successfully to: {report_filepath}")
except IOError as e:
    print(f"\nError writing report to file: {e}")

print("\nCategorical analysis script finished.")