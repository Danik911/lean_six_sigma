import math
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

# Sample size calculation with 95% confidence and ±5% margin of error
confidence_level = 0.95
margin_of_error = 0.05
estimated_accuracy = 0.85  # Based on initial assumption of 85% accuracy

total_sample_size = sample_size_proportion(confidence_level, margin_of_error, estimated_accuracy)
print(f"Required total sample size: {total_sample_size} items")

# Stratification by product type
# Based on SimplePharma's product distribution: Medical Devices 30%, Drugs 50%, Miscellaneous 20%
product_proportions = {'Medical Device': 0.3, 'Drug': 0.5, 'Miscellaneous': 0.2}

print("\nSample sizes for stratified sampling by product type:")
for product_type, proportion in product_proportions.items():
    stratum_sample_size = math.ceil(total_sample_size * proportion)
    print(f"{product_type}: {stratum_sample_size} items")

# Further stratification by location
location_proportions = {
    'Shop Floor': 0.4,
    'Storage Rooms': 0.3,
    'Warehouse': 0.3
}

print("\nSample sizes for major location categories:")
for location, proportion in location_proportions.items():
    stratum_sample_size = math.ceil(total_sample_size * proportion)
    print(f"{location}: {stratum_sample_size} items")

# For attribute MSA with proper representation
print("\nFor Attribute MSA (60 items total):")
for product_type, proportion in product_proportions.items():
    stratum_sample_size = math.ceil(60 * proportion)
    print(f"{product_type}: {stratum_sample_size} items")