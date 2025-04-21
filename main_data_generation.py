import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

def generate_simplepharma_baseline_data(n_records=1000):
    """
    Generate synthetic baseline data for SimplePharma's inventory accuracy analysis
    
    Parameters:
    n_records: Number of inventory count records to generate
    
    Returns:
    DataFrame with baseline inventory accuracy data with realistic X-Y relationships
    """
    # Define the potential X variables with meaningful distributions
    
    # 1. Staff factors
    staff_ids = list(range(1, 21))  # 20 staff members
    
    # Experience years with realistic distribution (more junior than senior staff)
    staff_experience = {}
    for staff_id in staff_ids:
        # Gamma distribution creates right-skewed experience distribution (more junior staff)
        experience = np.random.gamma(shape=2.0, scale=3.0)
        staff_experience[staff_id] = max(1, min(15, round(experience)))
    
    # Training levels correlated with experience
    staff_training = {}
    for staff_id, exp in staff_experience.items():
        if exp < 3:
            probs = [0.7, 0.3, 0.0]  # Mostly basic training for new staff
        elif exp < 8:
            probs = [0.2, 0.7, 0.1]  # Mostly intermediate for mid-experience
        else:
            probs = [0.1, 0.4, 0.5]  # Mostly advanced for experienced staff
        staff_training[staff_id] = np.random.choice(['Basic', 'Intermediate', 'Advanced'], p=probs)
    
    # Role distribution with hierarchy
    staff_roles = {}
    for staff_id, exp in staff_experience.items():
        if exp > 10:
            probs = [0.2, 0.5, 0.3]  # Experienced staff more likely to be leaders
        elif exp > 5:
            probs = [0.5, 0.4, 0.1]  # Mid-experience mixed roles
        else:
            probs = [0.8, 0.2, 0.0]  # New staff mostly pharmacy staff
        staff_roles[staff_id] = np.random.choice(['Pharmacy Staff', 'Warehouse Team', 'Team Leader'], p=probs)
    
    # 2. Product factors with realistic distributions
    product_types = ['Medical Device', 'Drug', 'Miscellaneous']
    product_type_weights = [0.3, 0.5, 0.2]  # As per SimplePharma's distribution
    
    product_subtypes = {
        'Medical Device': ['Diagnostic', 'Therapeutic', 'Monitoring', 'Surgical'],
        'Drug': ['Prescription', 'OTC', 'Controlled', 'Refrigerated'],
        'Miscellaneous': ['Hygiene', 'Supplements', 'First Aid', 'Baby Care']
    }
    
    # Packaging distributions vary by product type
    packaging_distributions = {
        'Medical Device': {'Individual': 0.5, 'Box': 0.4, 'Blister Pack': 0.1},
        'Drug': {'Blister Pack': 0.4, 'Bottle': 0.3, 'Box': 0.2, 'Tube': 0.1},
        'Miscellaneous': {'Individual': 0.3, 'Box': 0.3, 'Bottle': 0.2, 'Tube': 0.2}
    }
    
    # 3. Location factors mapped to building structure
    # Based on SimplePharma's two-building infrastructure
    locations = [
        'Shop Floor - Zone A', 'Shop Floor - Zone B', 'Shop Floor - Zone C',
        'Storage Room - Medical Devices', 'Storage Room - Drugs',
        'Warehouse - Main Building 3rd Floor', 'Warehouse - Shop Building Ground Floor'
    ]
    
    # Location probabilities based on product type (from documentation)
    location_by_product = {
        'Medical Device': [0.2, 0.1, 0.1, 0.3, 0.0, 0.3, 0.0],
        'Drug': [0.2, 0.2, 0.1, 0.0, 0.3, 0.0, 0.2],
        'Miscellaneous': [0.3, 0.2, 0.2, 0.0, 0.1, 0.0, 0.2]
    }
    
    # 4. Environmental factors
    # Time of day affects fatigue and accuracy
    times_of_day = ['Morning', 'Afternoon', 'Evening']
    
    # Day of week affects workload
    days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    day_weights = [0.2, 0.15, 0.15, 0.15, 0.2, 0.1, 0.05]  # Busier on Monday/Friday
    
    # End of month has higher activity and pressure
    is_end_of_month = [True, False]
    end_of_month_weights = [0.2, 0.8]  # 20% of counts happen at month-end
    
    # 5. System factors
    scanner_battery_levels = ['Low', 'Medium', 'High']
    scanner_battery_weights = [0.1, 0.3, 0.6]  # Mostly charged, sometimes issues
    
    scanner_models = ['Old Model', 'Current Model', 'New Model']
    scanner_model_weights = [0.2, 0.7, 0.1]  # Mostly current model
    
    scanner_calibrated = [True, False]
    calibration_weights = [0.7, 0.3]  # 70% properly calibrated
    
    erp_status = ['Normal', 'Slow', 'Maintenance Mode']
    erp_status_weights = [0.8, 0.15, 0.05]  # Mostly normal, occasionally issues
    
    wifi_strength = ['Weak', 'Normal', 'Strong']
    wifi_strength_by_location = {
        'Shop Floor - Zone A': [0.1, 0.7, 0.2],
        'Shop Floor - Zone B': [0.1, 0.7, 0.2],
        'Shop Floor - Zone C': [0.2, 0.7, 0.1],
        'Storage Room - Medical Devices': [0.3, 0.6, 0.1],
        'Storage Room - Drugs': [0.3, 0.6, 0.1],
        'Warehouse - Main Building 3rd Floor': [0.4, 0.5, 0.1],
        'Warehouse - Shop Building Ground Floor': [0.3, 0.6, 0.1]
    }
    
    # 6. Process factors
    count_methods = ['Manual Count', 'Scanner Count', 'Combined Method']
    # Count method probabilities based on product type
    count_method_by_product = {
        'Medical Device': [0.2, 0.7, 0.1],  # Mostly scanner for devices
        'Drug': [0.3, 0.6, 0.1],  # Mixed methods for drugs
        'Miscellaneous': [0.4, 0.5, 0.1]  # More manual for misc items
    }
    
    inventory_review_types = ['Regular Stock Check', 'Quarterly Stock-take', 'Ad-hoc Check']
    review_type_weights = [0.6, 0.3, 0.1]  # Distribution of check types
    
    # Generate the dataset
    data = []
    
    for i in range(n_records):
        # Select random date in last year
        record_date = (datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365)))
        
        # Determine if it's end of month
        is_end_of_month_val = record_date.day >= 25  # Simplification for end of month
        
        # Select staff member
        staff_id = np.random.choice(staff_ids)
        staff_exp = staff_experience[staff_id]
        staff_train = staff_training[staff_id]
        staff_role = staff_roles[staff_id]
        
        # Select product details
        product_type = np.random.choice(product_types, p=product_type_weights)
        product_subtype = np.random.choice(product_subtypes[product_type])
        
        # Packaging depends on product type
        packaging_options = list(packaging_distributions[product_type].keys())
        packaging_probs = list(packaging_distributions[product_type].values())
        packaging = np.random.choice(packaging_options, p=packaging_probs)
        
        # Location depends on product type
        location = np.random.choice(locations, p=location_by_product[product_type])
        
        # Environmental factors
        time_of_day = np.random.choice(times_of_day)
        day_of_week = np.random.choice(days_of_week, p=day_weights)
        
        # System factors
        scanner_battery = np.random.choice(scanner_battery_levels, p=scanner_battery_weights)
        scanner_model = np.random.choice(scanner_models, p=scanner_model_weights)
        is_calibrated = np.random.choice(scanner_calibrated, p=calibration_weights)
        erp_system_status = np.random.choice(erp_status, p=erp_status_weights)
        wifi = np.random.choice(wifi_strength, p=wifi_strength_by_location[location])
        
        # Process factors
        count_method = np.random.choice(count_methods, p=count_method_by_product[product_type])
        review_type = np.random.choice(inventory_review_types, p=review_type_weights)
        
        # Determine actual quantity based on product type and packaging
        if product_type == 'Medical Device':
            base_quantity = np.random.randint(1, 50)
        elif product_type == 'Drug':
            base_quantity = np.random.randint(5, 200)
        else:  # Miscellaneous
            base_quantity = np.random.randint(10, 100)
        
        # Adjust quantity based on packaging
        if packaging == 'Blister Pack':
            actual_quantity = base_quantity * np.random.randint(4, 12)
        elif packaging == 'Box':
            actual_quantity = base_quantity * np.random.randint(10, 50)
        elif packaging == 'Bottle':
            actual_quantity = base_quantity * np.random.randint(30, 100)
        else:  # Individual or Tube
            actual_quantity = base_quantity
        
        # Now build our Y=f(X) relationship for count accuracy
        # Start with base error rate
        base_error_rate = 0.15  # 15% baseline error rate
        
        # Apply modifiers based on X factors with different strengths
        # Strong factors (high impact on accuracy)
        if staff_exp < 3:
            base_error_rate *= 1.5  # New staff 50% more errors
        elif staff_exp > 10:
            base_error_rate *= 0.6  # Very experienced staff 40% fewer errors
        
        if staff_train == 'Basic':
            base_error_rate *= 1.4  # Basic training 40% more errors
        elif staff_train == 'Advanced':
            base_error_rate *= 0.7  # Advanced training 30% fewer errors
        
        if count_method == 'Manual Count':
            base_error_rate *= 1.6  # Manual counting 60% more errors
        elif count_method == 'Scanner Count':
            base_error_rate *= 0.7  # Scanner counting 30% fewer errors
        
        # Medium factors (moderate impact on accuracy)
        if 'Warehouse' in location:
            base_error_rate *= 1.3  # Warehouse location 30% more errors
        
        if scanner_battery == 'Low':
            base_error_rate *= 1.2  # Low battery 20% more errors
        
        if erp_system_status == 'Maintenance Mode':
            base_error_rate *= 1.3  # Maintenance mode 30% more errors
        elif erp_system_status == 'Slow':
            base_error_rate *= 1.1  # Slow ERP 10% more errors
        
        if time_of_day == 'Evening':
            base_error_rate *= 1.2  # Evening 20% more errors
        elif time_of_day == 'Morning':
            base_error_rate *= 0.9  # Morning 10% fewer errors
        
        if review_type == 'Quarterly Stock-take':
            base_error_rate *= 1.3  # Quarterly stock-take 30% more errors
        
        # Weak factors (minor impact on accuracy)
        if wifi == 'Weak':
            base_error_rate *= 1.1  # Weak WiFi 10% more errors
        
        if is_end_of_month_val:
            base_error_rate *= 1.1  # End of month 10% more errors
        
        if day_of_week in ['Monday', 'Friday']:
            base_error_rate *= 1.05  # Monday/Friday 5% more errors
        
        if not is_calibrated:
            base_error_rate *= 1.05  # Uncalibrated scanner 5% more errors
        
        # Product type factors
        if product_type == 'Drug' and product_subtype == 'Controlled':
            base_error_rate *= 0.8  # More careful with controlled substances
        
        if packaging == 'Box':
            base_error_rate *= 1.15  # Boxed items harder to count
        
        # Add some random noise (±20%)
        error_rate = base_error_rate * np.random.uniform(0.8, 1.2)
        
        # Cap error rate at reasonable bounds
        error_rate = min(0.8, max(0.01, error_rate))
        
        # Determine if an error will occur
        if np.random.random() < error_rate:
            # Determine error type (undercount more common than overcount)
            if np.random.random() < 0.7:  # 70% chance of undercount
                max_error = max(1, int(actual_quantity * 0.2))
                error_amount = np.random.randint(1, max_error + 1)
                counted_quantity = actual_quantity - error_amount
                error_type = 'Undercount'
            else:  # 30% chance of overcount
                max_error = max(1, int(actual_quantity * 0.15))
                error_amount = np.random.randint(1, max_error + 1)
                counted_quantity = actual_quantity + error_amount
                error_type = 'Overcount'
            
            count_accurate = False
        else:
            # No error
            counted_quantity = actual_quantity
            error_amount = 0
            error_type = 'None'
            count_accurate = True
        
        # Calculate error percentage
        if actual_quantity > 0 and error_amount > 0:
            error_percentage = (error_amount / actual_quantity) * 100
        else:
            error_percentage = 0
        
        # Calculate count time
        base_time_per_item = 0.5  # Base seconds per item
        
        # Count time modifiers
        time_factor = 1.0
        
        # Staff factors affect time
        time_factor *= max(0.6, min(1.5, 1.5 - (0.05 * staff_exp)))  # Experience speeds up counting
        
        if staff_train == 'Basic':
            time_factor *= 1.2  # Basic training 20% slower
        elif staff_train == 'Advanced':
            time_factor *= 0.8  # Advanced training 20% faster
        
        # Product and method factors
        if count_method == 'Manual Count':
            time_factor *= 1.5  # Manual counting 50% slower
        elif count_method == 'Scanner Count':
            time_factor *= 0.7  # Scanner counting 30% faster
        
        if product_type == 'Medical Device':
            time_factor *= 1.2  # Medical devices take longer to count
        
        if packaging == 'Box':
            time_factor *= 1.3  # Boxed items take longer
        
        # System factors
        if scanner_battery == 'Low':
            time_factor *= 1.2  # Low battery delays scanning
        
        if erp_system_status != 'Normal':
            time_factor *= 1.2  # System issues slow down process
        
        # Calculate time with some randomness
        count_time = actual_quantity * base_time_per_item * time_factor
        count_time = count_time * np.random.uniform(0.9, 1.1)  # Add ±10% random variation
        count_time = max(10, round(count_time))  # Minimum 10 seconds, rounded
        
        # Create the record with all our X and Y variables
        record = {
            # Identifiers
            'Record_ID': f'REC{i+1:04d}',
            'Date': record_date.strftime('%Y-%m-%d'),
            
            # Y variables (outcomes)
            'Actual_Quantity': actual_quantity,
            'Counted_Quantity': max(0, counted_quantity),  # Ensure no negative counts
            'Count_Accurate': count_accurate,
            'Error_Type': error_type,
            'Error_Amount': error_amount,
            'Error_Percentage': error_percentage,
            'Count_Time_Seconds': count_time,
            
            # X variables (factors)
            # Staff factors
            'Staff_ID': staff_id,
            'Staff_Experience_Years': staff_exp,
            'Staff_Training': staff_train,
            'Staff_Role': staff_role,
            
            # Product factors
            'Product_Type': product_type,
            'Product_Subtype': product_subtype,
            'Packaging': packaging,
            
            # Location factors
            'Location': location,
            
            # Environmental factors
            'Time_of_Day': time_of_day,
            'Day_of_Week': day_of_week,
            'End_of_Month': is_end_of_month_val,
            
            # System factors
            'Scanner_Battery': scanner_battery,
            'Scanner_Model': scanner_model,
            'Scanner_Calibrated': is_calibrated,
            'ERP_Status': erp_system_status,
            'WiFi_Strength': wifi,
            
            # Process factors
            'Count_Method': count_method,
            'Inventory_Review_Type': review_type
        }
        
        data.append(record)
    
    # Create DataFrame
    inventory_df = pd.DataFrame(data)
    
    # Data validation: Check error rates by key factors
    print("Data Validation - Error Rates by Key Factors:")
    
    # By staff training
    training_accuracy = inventory_df.groupby('Staff_Training')['Count_Accurate'].mean()
    print("\nAccuracy by Staff Training:")
    print(training_accuracy)
    
    # By count method
    method_accuracy = inventory_df.groupby('Count_Method')['Count_Accurate'].mean()
    print("\nAccuracy by Count Method:")
    print(method_accuracy)
    
    # By location type
    inventory_df['Location_Type'] = inventory_df['Location'].apply(
        lambda x: 'Warehouse' if 'Warehouse' in x else 
                 ('Storage' if 'Storage' in x else 'Shop Floor'))
    location_accuracy = inventory_df.groupby('Location_Type')['Count_Accurate'].mean()
    print("\nAccuracy by Location Type:")
    print(location_accuracy)
    
    # Overall metrics
    accuracy_percentage = inventory_df['Count_Accurate'].mean() * 100
    avg_error_percentage = inventory_df[inventory_df['Error_Amount'] > 0]['Error_Percentage'].mean()
    avg_count_time = inventory_df['Count_Time_Seconds'].mean()
    
    print("\nOverall Baseline Metrics:")
    print(f"Count Accuracy: {accuracy_percentage:.2f}%")
    print(f"Average Error Percentage (when errors occur): {avg_error_percentage:.2f}%")
    print(f"Average Count Time: {avg_count_time:.2f} seconds")
    
    return inventory_df

# Generate and save the data
inventory_df = generate_simplepharma_baseline_data(n_records=1000)
inventory_df.to_csv('simplepharma_inventory_analysis.csv', index=False)

# Create visualizations to verify data relationships
plt.figure(figsize=(15, 10))

# Staff Experience vs. Accuracy
plt.subplot(2, 2, 1)
staff_exp_accuracy = inventory_df.groupby('Staff_Experience_Years')['Count_Accurate'].mean()
plt.plot(staff_exp_accuracy.index, staff_exp_accuracy.values, 'o-')
plt.xlabel('Staff Experience (Years)')
plt.ylabel('Count Accuracy')
plt.title('Staff Experience vs. Count Accuracy')
plt.grid(True)

# Count Method vs. Count Time
plt.subplot(2, 2, 2)
sns.boxplot(x='Count_Method', y='Count_Time_Seconds', data=inventory_df)
plt.title('Count Method vs. Count Time')
plt.ylabel('Count Time (seconds)')

# Continue with more validation plots
plt.subplot(2, 2, 3)
sns.barplot(x='Inventory_Review_Type', y='Count_Accurate', data=inventory_df)
plt.title('Inventory Review Type vs. Count Accuracy')
plt.ylabel('Count Accuracy')

# Location Type vs. Accuracy
plt.subplot(2, 2, 4)
sns.barplot(x='Location_Type', y='Count_Accurate', data=inventory_df)
plt.title('Location Type vs. Count Accuracy')
plt.ylabel('Count Accuracy')

plt.tight_layout()
plt.savefig('data_validation_plots.png')
plt.close()

# Create additional visualizations for factor relationship validation
plt.figure(figsize=(15, 10))

# Error types distribution
plt.subplot(2, 2, 1)
error_counts = inventory_df['Error_Type'].value_counts()
plt.pie(error_counts, labels=error_counts.index, autopct='%1.1f%%')
plt.title('Distribution of Error Types')

# Count time by product type
plt.subplot(2, 2, 2)
sns.boxplot(x='Product_Type', y='Count_Time_Seconds', data=inventory_df)
plt.title('Count Time by Product Type')
plt.ylabel('Count Time (seconds)')

# Staff training vs error percentage
plt.subplot(2, 2, 3)
error_df = inventory_df[inventory_df['Error_Amount'] > 0]
sns.boxplot(x='Staff_Training', y='Error_Percentage', data=error_df)
plt.title('Staff Training vs Error Percentage (when errors occur)')
plt.ylabel('Error Percentage')

# System factors impact on accuracy
plt.subplot(2, 2, 4)
sns.barplot(x='ERP_Status', y='Count_Accurate', data=inventory_df)
plt.title('ERP System Status vs. Count Accuracy')
plt.ylabel('Count Accuracy')

plt.tight_layout()
plt.savefig('factor_relationship_validation.png')
plt.close()

print("\nData generation and validation complete. Visualizations saved.")