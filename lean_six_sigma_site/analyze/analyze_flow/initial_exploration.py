import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import os

# Set visualization style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set(font_scale=1.2)

# Load the dataset
try:
    # Assuming the CSV is in the parent directory relative to the script
    script_dir = os.path.dirname(__file__)
    csv_path = os.path.join(script_dir, '..', 'simplepharma_inventory_analysis.csv')
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    print(f"Error: Could not find the dataset at {csv_path}")
    # Attempt to load from the current working directory as a fallback
    try:
        df = pd.read_csv('simplepharma_inventory_analysis.csv')
        print("Loaded dataset from the current working directory.")
    except FileNotFoundError:
        print("Error: Could not find the dataset in the current working directory either. Exiting.")
        exit()

# --- Report Generation ---
report_content = []
report_content.append("# Initial Data Exploration Report")
report_content.append("\nThis report provides a basic overview and initial exploration of the SimplePharma inventory dataset.")

# Display basic information
report_content.append("\n## Basic Information")
report_content.append(f"- **Dataset shape:** {df.shape}")
report_content.append("\n### Data Types")
# Convert dtypes Series to markdown string
dtypes_md = df.dtypes.reset_index().rename(columns={'index': 'Column', 0: 'DataType'}).to_markdown(index=False)
report_content.append(dtypes_md)

# Display basic summary statistics
report_content.append("\n## Summary Statistics (Numerical Variables)")
# Convert describe DataFrame to markdown string
describe_md = df.describe().to_markdown()
report_content.append(describe_md)

# Check for missing values
report_content.append("\n## Missing Values")
missing_values = df.isnull().sum()
missing_values_md = missing_values[missing_values > 0].reset_index().rename(columns={'index': 'Column', 0: 'Missing Count'}).to_markdown(index=False)
if not missing_values[missing_values > 0].empty:
    report_content.append("Missing values per column:")
    report_content.append(missing_values_md)
else:
    report_content.append("No missing values found in the dataset.")

# Display sample rows
report_content.append("\n## Sample Data (First 5 Rows)")
# Convert head DataFrame to markdown string
head_md = df.head().to_markdown(index=False)
report_content.append(head_md)

# Check unique values for categorical variables
report_content.append("\n## Unique Values in Categorical Variables")
categorical_vars = ['Count_Accurate', 'Error_Type', 'Staff_Training', 'Staff_Role', 'Product_Type',
                    'Location_Type', 'Count_Method', 'Scanner_Calibrated']

for var in categorical_vars:
    if var in df.columns:
        report_content.append(f"\n### {var}")
        unique_vals = df[var].unique()
        report_content.append(f"- **Unique Values:** `{', '.join(map(str, unique_vals))}`")
        value_counts_md = df[var].value_counts().reset_index().rename(columns={'index': 'Value', var: 'Count'}).to_markdown(index=False)
        report_content.append("- **Value Counts:**")
        report_content.append(value_counts_md)
    else:
        report_content.append(f"\n### {var}")
        report_content.append(f"- *Column not found in dataset.*")

# --- Save Report to File ---
output_filename = "initial_exploration_report.md"
# Save the report in the same directory as the script
output_filepath = os.path.join(script_dir, output_filename)

try:
    with open(output_filepath, 'w') as f:
        f.write("\n".join(report_content))
    print(f"\nMarkdown report saved successfully to: {output_filepath}")
except IOError as e:
    print(f"\nError writing report to file: {e}")

# --- Optional: Display plots (if needed, keep separate from report generation) ---
# Example: Histogram of a numerical variable
# plt.figure(figsize=(10, 6))
# sns.histplot(df['Numerical_Variable_Name'], kde=True)
# plt.title('Distribution of Numerical Variable')
# plt.xlabel('Value')
# plt.ylabel('Frequency')
# plt.tight_layout()
# plt.show()  # Display the plot

print("\nInitial exploration script finished.")