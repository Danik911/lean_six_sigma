# Categorical Analysis Report

This report analyzes the relationship between various categorical factors and inventory count accuracy.
Overall Average Accuracy: 76.5%


## Analysis for: Staff_Training

- **Chi-Square Test:** χ²=29.68, p-value=0.000000
- **Statistically Significant (p < 0.05):** True

![Analysis plot for Staff_Training](categorical_plots\Staff_Training_analysis.png)


## Analysis for: Staff_Role

- **Chi-Square Test:** χ²=10.35, p-value=0.005668
- **Statistically Significant (p < 0.05):** True

![Analysis plot for Staff_Role](categorical_plots\Staff_Role_analysis.png)


## Analysis for: Product_Type

- **Chi-Square Test:** χ²=2.67, p-value=0.263052
- **Statistically Significant (p < 0.05):** False

![Analysis plot for Product_Type](categorical_plots\Product_Type_analysis.png)


## Analysis for: Location_Type

- **Chi-Square Test:** χ²=5.26, p-value=0.072059
- **Statistically Significant (p < 0.05):** False

![Analysis plot for Location_Type](categorical_plots\Location_Type_analysis.png)


## Analysis for: Count_Method

- **Chi-Square Test:** χ²=68.22, p-value=0.000000
- **Statistically Significant (p < 0.05):** True

![Analysis plot for Count_Method](categorical_plots\Count_Method_analysis.png)


## Analysis for: Scanner_Calibrated

- **Chi-Square Test:** χ²=0.00, p-value=1.000000
- **Statistically Significant (p < 0.05):** False

![Analysis plot for Scanner_Calibrated](categorical_plots\Scanner_Calibrated_analysis.png)


## Analysis for: Time_of_Day

- **Chi-Square Test:** χ²=7.25, p-value=0.026713
- **Statistically Significant (p < 0.05):** True

![Analysis plot for Time_of_Day](categorical_plots\Time_of_Day_analysis.png)


## Analysis for: End_of_Month

- **Chi-Square Test:** χ²=1.37, p-value=0.242321
- **Statistically Significant (p < 0.05):** False

![Analysis plot for End_of_Month](categorical_plots\End_of_Month_analysis.png)


## Analysis for: WiFi_Strength

- **Chi-Square Test:** χ²=1.25, p-value=0.536084
- **Statistically Significant (p < 0.05):** False

![Analysis plot for WiFi_Strength](categorical_plots\WiFi_Strength_analysis.png)


## Analysis for: Scanner_Battery

- **Chi-Square Test:** χ²=3.60, p-value=0.165166
- **Statistically Significant (p < 0.05):** False

![Analysis plot for Scanner_Battery](categorical_plots\Scanner_Battery_analysis.png)


## Chi-Square Test Results Summary

(Sorted by p-value)

| factor             |     chi2 |     p_value | significant   |
|:-------------------|---------:|------------:|:--------------|
| Count_Method       | 68.2155  | 1.5388e-15  | True          |
| Staff_Training     | 29.6763  | 3.59643e-07 | True          |
| Staff_Role         | 10.3458  | 0.00566808  | True          |
| Time_of_Day        |  7.24524 | 0.0267126   | True          |
| Location_Type      |  5.26055 | 0.0720586   | False         |
| Scanner_Battery    |  3.60161 | 0.165166    | False         |
| End_of_Month       |  1.36704 | 0.242321    | False         |
| Product_Type       |  2.67081 | 0.263052    | False         |
| WiFi_Strength      |  1.24693 | 0.536084    | False         |
| Scanner_Calibrated |  0       | 1           | False         |