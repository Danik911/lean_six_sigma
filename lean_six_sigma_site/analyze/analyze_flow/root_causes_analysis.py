import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import os
import statsmodels.api as sm # Import statsmodels

# --- Configuration ---
# Define the path to the dataset relative to the script location or use an absolute path
script_dir = os.path.dirname(__file__) # Get the directory where the script is located
# Go up one level to the 'lean_six_sigma' directory
base_dir = os.path.dirname(script_dir)
# Use the dataset with anomalies for root cause analysis
csv_filename = 'simplepharma_inventory_analysis_with_anomalies.csv'
csv_filepath = os.path.join(base_dir, csv_filename)

# Define output directory for plots and report
output_dir = os.path.join(script_dir, 'root_cause_analysis_output')
plot_dir = os.path.join(output_dir, 'plots')
report_filename = os.path.join(output_dir, 'root_cause_analysis_report.md')

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
                 # Attempt to coerce remaining values, setting errors to NaN, then fillna or dropna
                 df['Count_Accurate'] = pd.to_numeric(df['Count_Accurate'], errors='coerce')
                 df.dropna(subset=['Count_Accurate'], inplace=True) # Drop rows where conversion failed
                 df['Count_Accurate'] = df['Count_Accurate'].astype(bool)

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


# Prepare for logistic regression
# Only use the specified factors for this scope
model_vars = ['Count_Method', 'Staff_Training', 'Staff_Role', 'Time_of_Day', 'Staff_Experience_Years']

# Ensure selected columns exist and handle potential missing values before get_dummies
cols_to_check = model_vars + ['Count_Accurate']
missing_cols = [col for col in cols_to_check if col not in df.columns]
if missing_cols:
    print(f"Error: The following columns required for the model are missing: {missing_cols}")
    exit()

# Handle potential missing values in predictor columns (Example: fill categorical with 'Unknown', numeric with median)
for col in model_vars:
    if df[col].isnull().any():
        if df[col].dtype == 'object' or pd.api.types.is_categorical_dtype(df[col]):
            df[col].fillna('Unknown', inplace=True)
            print(f"Filled NaN in categorical column '{col}' with 'Unknown'.")
        elif pd.api.types.is_numeric_dtype(df[col]):
            median_val = df[col].median()
            df[col].fillna(median_val, inplace=True)
            print(f"Filled NaN in numeric column '{col}' with median value ({median_val}).")

# Drop rows where the target variable is still NaN (should have been handled earlier, but as a safeguard)
df.dropna(subset=['Count_Accurate'], inplace=True)

# Create dummy variables for categorical predictors in scope
df_model = pd.get_dummies(
    df[model_vars + ['Count_Accurate']],
    columns=['Count_Method', 'Staff_Training', 'Staff_Role', 'Time_of_Day'],
    drop_first=True,
    dummy_na=False
)

# Define X (predictors) and y (outcome)
X = df_model.drop('Count_Accurate', axis=1)
y = df_model['Count_Accurate']

# Ensure all columns in X are numeric
X = X.apply(pd.to_numeric, errors='coerce') # Coerce any remaining non-numeric to NaN

# Convert any boolean columns to int (0/1) for statsmodels compatibility
for col in X.select_dtypes(include=['bool']).columns:
    X[col] = X[col].astype(int)

# Handle any NaNs that might have been introduced by coercion or were missed
if X.isnull().values.any():
    print("Warning: NaNs detected in predictor variables after dummy creation/coercion. Dropping rows with NaNs.")
    nan_rows_X = X.isnull().any(axis=1)
    X = X[~nan_rows_X]
    y = y[~nan_rows_X] # Ensure y aligns with X

# Ensure y is numeric (0 or 1) for Logit
y = y.astype(int)

# Add a constant to the model
# import statsmodels.api as sm # Already imported at the top
X = sm.add_constant(X, has_constant='add') # Ensure constant is added correctly

# Check dtypes before fitting
print("\nData types for model fitting:")
print("y dtype:", y.dtype)
print("X dtypes:\n", X.dtypes)
print(f"\nShape of X: {X.shape}")
print(f"Shape of y: {y.shape}")
if X.shape[0] != y.shape[0]:
    print("Error: X and y have mismatched number of rows before fitting.")
    exit()
if X.shape[0] == 0:
    print("Error: No data left to fit the model after processing NaNs.")
    exit()


# Fit the logistic regression model
try:
    model = sm.Logit(y, X)
    result = model.fit()
except Exception as fit_e:
    print(f"Error fitting the logistic regression model: {fit_e}")
    # Add more detailed checks
    print("Checking for issues:")
    print(f"  Any NaN in y? {y.isnull().any()}")
    print(f"  Any NaN in X? {X.isnull().values.any()}")
    print(f"  Any non-numeric columns in X? {(X.dtypes == 'object').any()}")
    # Check for perfect separation (less direct to check programmatically without fitting)
    print("  Consider checking for perfect separation manually if issues persist.")
    exit()


# --- Generate Report Content ---
report_content = ["# Root Cause Analysis Report (Logistic Regression)\n"]
report_content.append(f"Analyzed dataset: `{csv_filename}`\n")
report_content.append("This report uses logistic regression to identify factors significantly associated with inventory count accuracy (`Count_Accurate`).\n")

# Display the summary
report_content.append("## Logistic Regression Model Summary\n")
# Capture summary as string - might need adjustment based on statsmodels version
try:
    summary_string = result.summary().as_text()
    report_content.append(f"```\n{summary_string}\n```\n")
except AttributeError: # Older versions might not have as_text()
     try:
         summary_string = result.summary2().as_text()
         report_content.append(f"```\n{summary_string}\n```\n")
     except Exception as summary_e:
         report_content.append(f"*Could not automatically capture model summary: {summary_e}*\n")
         print(result.summary()) # Print to console as fallback


# Calculate odds ratios
odds_ratios = pd.DataFrame({
    'Odds Ratio': result.params.apply(np.exp),
    'Lower CI (2.5%)': result.conf_int()[0].apply(np.exp),
    'Upper CI (97.5%)': result.conf_int()[1].apply(np.exp),
    'p-value': result.pvalues
})
odds_ratios = odds_ratios.sort_values('Odds Ratio', ascending=False)

report_content.append("\n## Odds Ratios\n")
report_content.append("Odds ratios indicate the change in odds of an accurate count for a one-unit change in the predictor.")
report_content.append("- Odds Ratio > 1: Increased odds of accuracy.")
report_content.append("- Odds Ratio < 1: Decreased odds of accuracy.")
report_content.append("- CI includes 1: Effect is not statistically significant (at p=0.05).\n")
report_content.append(odds_ratios.to_markdown(floatfmt=".3f"))
report_content.append("\n")


# Prepare data for visual representation of effects
effect_data = []
for var in result.params.index:
    if var != 'const': # Exclude the constant term
        effect_data.append({
            'Variable': var,
            'Coefficient': result.params[var],
            'p-value': result.pvalues[var],
            'Odds Ratio': np.exp(result.params[var]),
            'Significant': result.pvalues[var] < 0.05
        })

effect_df = pd.DataFrame(effect_data)
effect_df = effect_df.sort_values('Odds Ratio', ascending=False)

# Plot the odds ratios
plt.figure(figsize=(12, max(8, len(effect_df)*0.5))) # Adjust height based on number of variables
colors = ['#4CAF50' if sig else '#9E9E9E' for sig in effect_df['Significant']] # Green for significant, Gray otherwise
sns.barplot(x='Odds Ratio', y='Variable', data=effect_df, palette=colors, orient='h')
plt.axvline(x=1, color='red', linestyle='--', linewidth=1, label='Odds Ratio = 1 (No Effect)')
plt.title('Effect of Factors on Count Accuracy (Odds Ratios with 95% CI)')
plt.xlabel('Odds Ratio (log scale) - Higher is better for accuracy')
plt.ylabel('Predictor Variable')
plt.xscale('log') # Log scale is standard for odds ratios
# Add confidence intervals if easily available (requires accessing conf_int again and matching)
# For simplicity, the bar color indicates significance based on p-value < 0.05
plt.legend()
plt.grid(True, axis='x', linestyle='--', alpha=0.6)
plt.tight_layout()

# Save the plot
plot_filename = 'odds_ratio_plot.png'
plot_filepath = os.path.join(plot_dir, plot_filename)
try:
    plt.savefig(plot_filepath)
    print(f"Odds ratio plot saved to: {plot_filepath}")
    # Add relative path for Markdown link
    relative_plot_path = os.path.join(os.path.basename(plot_dir), plot_filename)
    report_content.append(f"\n## Odds Ratio Visualization\n")
    report_content.append(f"![Odds Ratio Plot]({relative_plot_path})\n")
    report_content.append("*Green bars indicate factors significantly associated with count accuracy (p < 0.05). Red dashed line indicates no effect.*\n")

except Exception as plot_e:
    print(f"Error saving plot: {plot_e}")
    report_content.append("\n*Failed to save odds ratio plot.*\n")

plt.close() # Close the plot figure


# --- Save Report to File ---
try:
    with open(report_filename, 'w') as f:
        f.write("\n".join(report_content))
    print(f"\nMarkdown report saved successfully to: {report_filename}")
except IOError as e:
    print(f"\nError writing report to file: {e}")

print("\nRoot cause analysis complete. Report and visualizations saved.")