import math
import os
from scipy import stats

def sample_size_proportion(confidence_level, margin_of_error, estimated_proportion=0.5):
    """
    Calculate sample size for estimating a proportion

    Parameters:
    confidence_level: Desired confidence level (e.g., 0.95 for 95% confidence)
    margin_of_error: Desired margin of error (e.g., 0.05 for ±5%)
    estimated_proportion: Estimated proportion (0.5 gives maximum sample size)

    Returns:
    Required sample size
    """
    z_score = stats.norm.ppf(1 - (1 - confidence_level) / 2)
    sample_size = (z_score**2 * estimated_proportion * (1 - estimated_proportion)) / (margin_of_error**2)
    return math.ceil(sample_size)

# --- Configuration ---
confidence_level = 0.95
margin_of_error = 0.05
estimated_accuracy = 0.85  # Based on initial assumption of 85% accuracy
product_proportions = {'Medical Device': 0.3, 'Drug': 0.5, 'Miscellaneous': 0.2}
location_proportions = {
    'Shop Floor': 0.4,
    'Storage Rooms': 0.3,
    'Warehouse': 0.3
}
attribute_msa_total_items = 60
output_filename = "sample_size_report.md"

# --- Calculations ---
total_sample_size = sample_size_proportion(confidence_level, margin_of_error, estimated_accuracy)

# --- Generate Markdown Report ---
markdown_output = []
markdown_output.append("# Sample Size Calculation Report")
markdown_output.append(f"\nCalculated based on:\n- Confidence Level: {confidence_level*100}%")
markdown_output.append(f"- Margin of Error: ±{margin_of_error*100}%")
markdown_output.append(f"- Estimated Accuracy/Proportion: {estimated_accuracy*100}%")

markdown_output.append(f"\n## Required Total Sample Size\n\n**{total_sample_size}** items")

markdown_output.append("\n## Stratification by Product Type")
markdown_output.append("\nBased on SimplePharma's product distribution:")
for product_type, proportion in product_proportions.items():
    stratum_sample_size = math.ceil(total_sample_size * proportion)
    markdown_output.append(f"- {product_type} ({proportion*100}%): **{stratum_sample_size}** items")

markdown_output.append("\n## Stratification by Location")
markdown_output.append("\nBased on estimated distribution across major locations:")
for location, proportion in location_proportions.items():
    stratum_sample_size = math.ceil(total_sample_size * proportion)
    markdown_output.append(f"- {location} ({proportion*100}%): **{stratum_sample_size}** items")

markdown_output.append(f"\n## Attribute MSA Sample Sizes ({attribute_msa_total_items} items total)")
markdown_output.append("\nProportionally distributed by product type:")
for product_type, proportion in product_proportions.items():
    stratum_sample_size = math.ceil(attribute_msa_total_items * proportion)
    markdown_output.append(f"- {product_type}: **{stratum_sample_size}** items")

# --- Save Report to File ---
script_dir = os.path.dirname(__file__)
output_filepath = os.path.join(script_dir, output_filename)

try:
    with open(output_filepath, 'w') as f:
        f.write("\n".join(markdown_output))
    print(f"\nMarkdown report saved successfully to: {output_filepath}")
except IOError as e:
    print(f"\nError writing report to file: {e}")