import pandas as pd
import numpy as np
import random

# Set seed for reproducibility
np.random.seed(42)

# Define parameters
num_items = 60
num_appraisers = 3
num_trials = 2

# Define appraisers
appraiser_names = ['Pharmacy Staff', 'Team Leader', 'Warehouse Team']

# Create product characteristics that affect counting difficulty
product_types = ['Medical Device', 'Drug', 'Miscellaneous']
size_categories = ['Small', 'Medium', 'Large']
packaging_types = ['Individual', 'Bulk', 'Blister Pack']
storage_locations = ['Shop Floor', 'Medical Device Storage', 'Drug Storage', 'Warehouse']

# Generate items with characteristics
items = []
for i in range(1, num_items + 1):
    item_id = f'ITEM{i:03d}'
    product_type = random.choice(product_types)
    size = random.choice(size_categories)
    packaging = random.choice(packaging_types)
    location = random.choice(storage_locations)
    
    # Determine true quantity based on characteristics
    if packaging == 'Bulk':
        true_qty = np.random.randint(20, 101)
    elif packaging == 'Blister Pack':
        true_qty = np.random.randint(5, 21)
    else:  # Individual packaging
        true_qty = np.random.randint(1, 16)
    
    # Calculate difficulty score (1-10)
    difficulty = 0
    if size == 'Small': difficulty += 3
    if packaging == 'Bulk': difficulty += 4
    if product_type == 'Miscellaneous': difficulty += 2
    if location == 'Warehouse': difficulty += 1
    difficulty = max(1, min(10, difficulty))
    
    items.append({
        'Item_ID': item_id,
        'Product_Type': product_type,
        'Size': size,
        'Packaging': packaging,
        'Location': location,
        'True_Quantity': true_qty,
        'Difficulty': difficulty
    })

# Create a dataframe with item information
items_df = pd.DataFrame(items)

# Generate counts and assessments
counts_data = []
binary_data = []
category_data = []

for item_idx in range(num_items):
    item = items[item_idx]
    item_id = item['Item_ID']
    true_qty = item['True_Quantity']
    difficulty = item['Difficulty']
    
    # Define tolerance for this item (5% or at least 1 unit)
    tolerance = max(1, int(true_qty * 0.05))
    
    # Generate counts for each appraiser and trial
    item_counts = {'Item_ID': item_id, 'True_Quantity': true_qty}
    item_binary = {'Item_ID': item_id, 'True_Quantity': true_qty}
    item_category = {'Item_ID': item_id, 'True_Quantity': true_qty}
    
    # The reference "Standard" value (correctly categorized)
    item_binary['Standard'] = 1  # Binary: 1 = Acceptable, 0 = Not Acceptable
    item_category['Standard'] = "Accurate"  # Category: "Accurate", "Undercount", "Overcount"
    
    for appraiser in appraiser_names:
        # Adjust error rate based on appraiser role
        if appraiser == 'Team Leader':
            error_multiplier = 0.7  # Most experienced
        elif appraiser == 'Warehouse Team':
            error_multiplier = 1.0  # Average experience
        else:
            error_multiplier = 1.2  # Least experienced
        
        for trial in range(1, num_trials + 1):
            # Column name for this appraiser and trial
            col_name = f"{appraiser}_{trial}"
            
            # Calculate error probability
            error_prob = (difficulty / 10) * error_multiplier
            
            # Determine if error occurs and generate count
            if np.random.random() < error_prob:
                max_error = max(int(true_qty * 0.2), 1)
                error = np.random.choice([-max_error, -1, 1, max_error], p=[0.1, 0.4, 0.4, 0.1])
                counted_qty = max(0, true_qty + error)
            else:
                counted_qty = true_qty
            
            # Store the count
            item_counts[col_name] = counted_qty
            
            # Determine binary assessment (1 = Acceptable, 0 = Not Acceptable)
            acceptable = abs(counted_qty - true_qty) <= tolerance
            item_binary[col_name] = 1 if acceptable else 0
            
            # Determine category assessment
            if counted_qty < true_qty - tolerance:
                category = "Undercount"
            elif counted_qty > true_qty + tolerance:
                category = "Overcount"
            else:
                category = "Accurate"
            item_category[col_name] = category
    
    counts_data.append(item_counts)
    binary_data.append(item_binary)
    category_data.append(item_category)

# Create dataframes
counts_df = pd.DataFrame(counts_data)
binary_df = pd.DataFrame(binary_data)
category_df = pd.DataFrame(category_data)

# Save files
items_df.to_csv('inventory_items_info.csv', index=False)
counts_df.to_csv('inventory_counts.csv', index=False)
binary_df.to_csv('minitab_attribute_msa_binary.csv', index=False)
category_df.to_csv('minitab_attribute_msa_category.csv', index=False)

# Display sample of the data
print("Binary Assessment Data (Sample):")
print(binary_df.head())
print("\nCategory Assessment Data (Sample):")
print(category_df.head())