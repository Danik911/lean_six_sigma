import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

def generate_msa_data(n_items=60):
    """
    Generate properly formatted MSA data for Minitab analysis
    
    Parameters:
    n_items: Number of items to evaluate (standard is 60 for attribute MSA)
    
    Returns:
    DataFrame formatted for Minitab attribute agreement analysis
    """
    # Item details based on product type stratification
    items = []
    
    # Generate 30% medical devices (18 items)
    for i in range(18):
        items.append({
            'Item_ID': f'MD{i+1:03d}',
            'Product_Type': 'Medical Device',
            'True_Quantity': np.random.randint(1, 50)
        })
    
    # Generate 50% drugs (30 items)
    for i in range(30):
        items.append({
            'Item_ID': f'DR{i+1:03d}',
            'Product_Type': 'Drug',
            'True_Quantity': np.random.randint(5, 200)
        })
    
    # Generate 20% miscellaneous items (12 items)
    for i in range(12):
        items.append({
            'Item_ID': f'MS{i+1:03d}',
            'Product_Type': 'Miscellaneous',
            'True_Quantity': np.random.randint(10, 100)
        })
    
    # Create MSA results
    msa_results = []
    
    # Define error rates for different appraiser-product combinations
    # This creates realistic relationships between appraiser expertise and product types
    error_rates = {
        ('Pharmacy Staff', 'Medical Device'): 0.20,
        ('Pharmacy Staff', 'Drug'): 0.12,
        ('Pharmacy Staff', 'Miscellaneous'): 0.15,
        
        ('Warehouse Team', 'Medical Device'): 0.10,
        ('Warehouse Team', 'Drug'): 0.15,
        ('Warehouse Team', 'Miscellaneous'): 0.08,
        
        ('Team Leader', 'Medical Device'): 0.05,
        ('Team Leader', 'Drug'): 0.06,
        ('Team Leader', 'Miscellaneous'): 0.04
    }
    
    for item in items:
        # For Minitab attribute MSA, we need:
        # - Standard (known correct value)
        # - Results from each appraiser's trials
        
        # Create record
        record = {
            'Item_ID': item['Item_ID'],
            'True_Quantity': item['True_Quantity'],
            'Standard': 1  # Standard is always 1 (accurate)
        }
        
        # Generate results for each appraiser's trials
        for appraiser in ['Pharmacy Staff', 'Warehouse Team', 'Team Leader']:
            # Get error rate for this appraiser-product combination
            error_rate = error_rates[(appraiser, item['Product_Type'])]
            
            # Generate two trials per appraiser
            for trial in [1, 2]:
                # Determine if this count will be accurate (1) or inaccurate (0)
                # First trial might be slightly better as they're more focused
                trial_modifier = 0.9 if trial == 1 else 1.1
                is_accurate = np.random.random() > (error_rate * trial_modifier)
                
                # Add to record with proper column naming for Minitab
                record[f'{appraiser}_{trial}'] = 1 if is_accurate else 0
        
        msa_results.append(record)
    
    # Create DataFrame
    msa_df = pd.DataFrame(msa_results)
    
    # Calculate baseline agreement statistics for validation
    within_appraiser = {}
    for appraiser in ['Pharmacy Staff', 'Warehouse Team', 'Team Leader']:
        agreement = sum(msa_df[f'{appraiser}_1'] == msa_df[f'{appraiser}_2']) / len(msa_df)
        within_appraiser[appraiser] = agreement * 100
    
    print("Within-Appraiser Agreement (Repeatability):")
    for appraiser, agreement in within_appraiser.items():
        print(f"{appraiser}: {agreement:.2f}%")
    
    return msa_df

# Generate and save MSA data in Minitab format
msa_df = generate_msa_data()
msa_df.to_csv('minitab_attribute_msa_binary.csv', index=False)