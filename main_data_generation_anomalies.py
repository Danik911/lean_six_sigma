import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def generate_simplepharma_baseline_data_with_anomalies(n_records=1000):
    """
    Generate synthetic baseline data for SimplePharma with realistic anomalies
    
    Parameters:
    n_records: Number of inventory count records to generate
    
    Returns:
    DataFrame with baseline inventory accuracy data including special cause variations
    """
    # Get the base dataset
    inventory_df = generate_simplepharma_baseline_data(n_records)
    
    # Convert date column to datetime for easier manipulation
    inventory_df['Date'] = pd.to_datetime(inventory_df['Date'])
    
    # 1. System Outage Day - March 15, 2023
    system_outage_date = pd.to_datetime('2023-03-15')
    system_outage_mask = (inventory_df['Date'] == system_outage_date)
    
    # Modify records on system outage day
    if sum(system_outage_mask) > 0:
        inventory_df.loc[system_outage_mask, 'ERP_Status'] = 'Maintenance Mode'
        inventory_df.loc[system_outage_mask, 'Count_Method'] = 'Manual Count'  # Forced to count manually
        
        # Increase error rates and count time during outage
        error_indices = inventory_df[system_outage_mask].index
        for idx in error_indices:
            # Higher chance of errors
            if np.random.random() < 0.4:  # 40% chance of new errors
                if inventory_df.loc[idx, 'Count_Accurate'] == True:
                    inventory_df.loc[idx, 'Count_Accurate'] = False
                    
                    # Generate a new error
                    actual_qty = inventory_df.loc[idx, 'Actual_Quantity']
                    max_error = max(1, int(actual_qty * 0.3))  # Larger errors during outage
                    error_amount = np.random.randint(1, max_error + 1)
                    
                    if np.random.random() < 0.7:  # 70% undercount
                        counted_qty = actual_qty - error_amount
                        error_type = 'Undercount'
                    else:
                        counted_qty = actual_qty + error_amount
                        error_type = 'Overcount'
                    
                    inventory_df.loc[idx, 'Counted_Quantity'] = max(0, counted_qty)
                    inventory_df.loc[idx, 'Error_Type'] = error_type
                    inventory_df.loc[idx, 'Error_Amount'] = error_amount
                    inventory_df.loc[idx, 'Error_Percentage'] = (error_amount / actual_qty) * 100
            
            # Increase count time by 50-100%
            inventory_df.loc[idx, 'Count_Time_Seconds'] *= np.random.uniform(1.5, 2.0)
    
    # 2. New Employee Training Period - First two weeks of February 2023
    training_start = pd.to_datetime('2023-02-01')
    training_end = pd.to_datetime('2023-02-14')
    
    training_period_mask = (inventory_df['Date'] >= training_start) & (inventory_df['Date'] <= training_end)
    
    # Add new trainee staff IDs
    trainee_ids = [101, 102, 103]  # Special IDs for trainees
    
    # Select a subset of records during training period to assign to trainees
    trainee_indices = inventory_df[training_period_mask].sample(frac=0.3).index
    
    for idx in trainee_indices:
        inventory_df.loc[idx, 'Staff_ID'] = np.random.choice(trainee_ids)
        inventory_df.loc[idx, 'Staff_Experience_Years'] = 0
        inventory_df.loc[idx, 'Staff_Training'] = 'Basic'
        inventory_df.loc[idx, 'Staff_Role'] = 'Pharmacy Staff'
        
        # Trainees have higher error rates and longer count times
        if np.random.random() < 0.5:  # 50% chance of error for trainees
            inventory_df.loc[idx, 'Count_Accurate'] = False
            
            actual_qty = inventory_df.loc[idx, 'Actual_Quantity']
            max_error = max(1, int(actual_qty * 0.25))
            error_amount = np.random.randint(1, max_error + 1)
            
            if np.random.random() < 0.6:  # 60% undercount
                counted_qty = actual_qty - error_amount
                error_type = 'Undercount'
            else:
                counted_qty = actual_qty + error_amount
                error_type = 'Overcount'
            
            inventory_df.loc[idx, 'Counted_Quantity'] = max(0, counted_qty)
            inventory_df.loc[idx, 'Error_Type'] = error_type
            inventory_df.loc[idx, 'Error_Amount'] = error_amount
            inventory_df.loc[idx, 'Error_Percentage'] = (error_amount / actual_qty) * 100
        
        # Trainees take 2-3x longer
        inventory_df.loc[idx, 'Count_Time_Seconds'] *= np.random.uniform(2.0, 3.0)
    
    # 3. Holiday Rush Period - December 15-24, 2023
    holiday_start = pd.to_datetime('2023-12-15')
    holiday_end = pd.to_datetime('2023-12-24')
    
    holiday_mask = (inventory_df['Date'] >= holiday_start) & (inventory_df['Date'] <= holiday_end)
    
    # Add temporary holiday staff
    temp_staff_ids = [201, 202, 203, 204, 205]
    temp_staff_indices = inventory_df[holiday_mask].sample(frac=0.4).index
    
    for idx in temp_staff_indices:
        inventory_df.loc[idx, 'Staff_ID'] = np.random.choice(temp_staff_ids)
        inventory_df.loc[idx, 'Staff_Experience_Years'] = np.random.randint(0, 2)
        inventory_df.loc[idx, 'Staff_Training'] = 'Basic'
        inventory_df.loc[idx, 'Staff_Role'] = 'Pharmacy Staff'
        
        # Temporary staff have higher error rates
        if np.random.random() < 0.4:  # 40% chance of error
            inventory_df.loc[idx, 'Count_Accurate'] = False
            
            actual_qty = inventory_df.loc[idx, 'Actual_Quantity']
            max_error = max(1, int(actual_qty * 0.2))
            error_amount = np.random.randint(1, max_error + 1)
            
            if np.random.random() < 0.7:
                counted_qty = actual_qty - error_amount
                error_type = 'Undercount'
            else:
                counted_qty = actual_qty + error_amount
                error_type = 'Overcount'
            
            inventory_df.loc[idx, 'Counted_Quantity'] = max(0, counted_qty)
            inventory_df.loc[idx, 'Error_Type'] = error_type
            inventory_df.loc[idx, 'Error_Amount'] = error_amount
            inventory_df.loc[idx, 'Error_Percentage'] = (error_amount / actual_qty) * 100
    
    # For all holiday period records, increase time pressure
    holiday_indices = inventory_df[holiday_mask].index
    for idx in holiday_indices:
        # Rushed counting, less time but more errors
        inventory_df.loc[idx, 'Count_Time_Seconds'] *= np.random.uniform(0.7, 0.9)
        
        # Higher general error rate during holiday rush
        if inventory_df.loc[idx, 'Count_Accurate'] == True and np.random.random() < 0.2:
            inventory_df.loc[idx, 'Count_Accurate'] = False
            
            actual_qty = inventory_df.loc[idx, 'Actual_Quantity']
            max_error = max(1, int(actual_qty * 0.15))
            error_amount = np.random.randint(1, max_error + 1)
            
            if np.random.random() < 0.7:
                counted_qty = actual_qty - error_amount
                error_type = 'Undercount'
            else:
                counted_qty = actual_qty + error_amount
                error_type = 'Overcount'
            
            inventory_df.loc[idx, 'Counted_Quantity'] = max(0, counted_qty)
            inventory_df.loc[idx, 'Error_Type'] = error_type
            inventory_df.loc[idx, 'Error_Amount'] = error_amount
            inventory_df.loc[idx, 'Error_Percentage'] = (error_amount / actual_qty) * 100
    
    # 4. Similar Packaging Batch - Create a specific product ID with consistent issues
    # Add a product ID column
    inventory_df['Product_ID'] = "P" + inventory_df['Record_ID'].str.slice(start=3)
    
    # Create a problematic product batch with similar packaging
    similar_packaging_ids = ['SP001', 'SP002', 'SP003', 'SP004', 'SP005']
    
    # Select random records to assign these IDs (about 5% of data)
    similar_packaging_indices = np.random.choice(inventory_df.index, size=int(n_records * 0.05), replace=False)
    
    for i, idx in enumerate(similar_packaging_indices):
        product_id = similar_packaging_ids[i % len(similar_packaging_ids)]
        inventory_df.loc[idx, 'Product_ID'] = product_id
        inventory_df.loc[idx, 'Product_Type'] = 'Drug'  # These are typically drugs
        inventory_df.loc[idx, 'Product_Subtype'] = 'OTC'  # Over-the-counter medications
        inventory_df.loc[idx, 'Packaging'] = 'Blister Pack'  # Similar packaging
        
        # These products have high error rates due to packaging confusion
        if np.random.random() < 0.6:  # 60% chance of error
            inventory_df.loc[idx, 'Count_Accurate'] = False
            
            actual_qty = inventory_df.loc[idx, 'Actual_Quantity']
            max_error = max(1, int(actual_qty * 0.3))
            error_amount = np.random.randint(1, max_error + 1)
            
            # These are typically overcounted (confused with similar products)
            if np.random.random() < 0.8:  # 80% overcount for these products
                counted_qty = actual_qty + error_amount
                error_type = 'Overcount'
            else:
                counted_qty = actual_qty - error_amount
                error_type = 'Undercount'
            
            inventory_df.loc[idx, 'Counted_Quantity'] = max(0, counted_qty)
            inventory_df.loc[idx, 'Error_Type'] = error_type
            inventory_df.loc[idx, 'Error_Amount'] = error_amount
            inventory_df.loc[idx, 'Error_Percentage'] = (error_amount / actual_qty) * 100
    
    # Add a note about special causes
    inventory_df['Special_Cause'] = 'None'
    inventory_df.loc[system_outage_mask, 'Special_Cause'] = 'System Outage'
    inventory_df.loc[trainee_indices, 'Special_Cause'] = 'New Employee Training'
    inventory_df.loc[holiday_mask, 'Special_Cause'] = 'Holiday Rush'
    inventory_df.loc[similar_packaging_indices, 'Special_Cause'] = 'Similar Packaging Confusion'
    
    # Validate the anomalies have been properly introduced
    print("\nSpecial Cause Variation Summary:")
    special_cause_counts = inventory_df['Special_Cause'].value_counts()
    print(special_cause_counts)
    
    # Accuracy rates by special cause
    special_cause_accuracy = inventory_df.groupby('Special_Cause')['Count_Accurate'].mean()
    print("\nAccuracy Rates by Special Cause:")
    print(special_cause_accuracy)
    
    # Save the enhanced dataset
    inventory_df.to_csv('simplepharma_inventory_analysis_with_anomalies.csv', index=False)
    
    return inventory_df

# Generate the enhanced dataset with special causes
enhanced_df = generate_simplepharma_baseline_data_with_anomalies(n_records=1000)

# Create visualizations to highlight the special causes
plt.figure(figsize=(15, 10))

# Accuracy by special cause
plt.subplot(2, 2, 1)
special_cause_accuracy = enhanced_df.groupby('Special_Cause')['Count_Accurate'].mean()
sns.barplot(x=special_cause_accuracy.index, y=special_cause_accuracy.values)
plt.title('Count Accuracy by Special Cause')
plt.ylabel('Accuracy Rate')
plt.xticks(rotation=45, ha='right')

# Error amounts by special cause
plt.subplot(2, 2, 2)
error_df = enhanced_df[enhanced_df['Error_Amount'] > 0]
sns.boxplot(x='Special_Cause', y='Error_Amount', data=error_df)
plt.title('Error Amounts by Special Cause')
plt.ylabel('Error Amount')
plt.xticks(rotation=45, ha='right')

# Count time by special cause
plt.subplot(2, 2, 3)
sns.boxplot(x='Special_Cause', y='Count_Time_Seconds', data=enhanced_df)
plt.title('Count Time by Special Cause')
plt.ylabel('Count Time (seconds)')
plt.xticks(rotation=45, ha='right')

# System outage day pattern
plt.subplot(2, 2, 4)
system_outage = enhanced_df[enhanced_df['Special_Cause'] == 'System Outage']
if not system_outage.empty:
    error_types = system_outage['Error_Type'].value_counts()
    plt.pie(error_types, labels=error_types.index, autopct='%1.1f%%')
    plt.title('Error Types During System Outage')

plt.tight_layout()
plt.savefig('special_cause_analysis.png')
plt.close()

print("\nEnhanced data generation complete with special cause variations.")