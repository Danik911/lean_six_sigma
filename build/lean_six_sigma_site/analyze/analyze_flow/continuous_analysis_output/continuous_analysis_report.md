# Continuous Variable Analysis Report

This report examines the relationship between key continuous variables and inventory count accuracy based on the data in `simplepharma_inventory_analysis.csv`.

Overall Average Accuracy: 76.5%


## Analysis for: Actual_Quantity

- **T-Test Results:**
    - T-Statistic: 1.049
    - P-Value: 0.2949
    - **Statistically Significant (p < 0.05): False**
- **Mean Values:**
    - Mean (Actual_Quantity) for Accurate Counts: 1692.10
    - Mean (Actual_Quantity) for Inaccurate Counts: 1506.23
    - Difference (Accurate - Inaccurate): 185.88

![Box plot for Actual_Quantity](plots\Actual_Quantity_boxplot.png)

---

## Analysis for: Staff_Experience_Years

- **T-Test Results:**
    - T-Statistic: 6.855
    - P-Value: 0.0000
    - **Statistically Significant (p < 0.05): True**
- **Mean Values:**
    - Mean (Staff_Experience_Years) for Accurate Counts: 5.60
    - Mean (Staff_Experience_Years) for Inaccurate Counts: 4.23
    - Difference (Accurate - Inaccurate): 1.36

![Box plot for Staff_Experience_Years](plots\Staff_Experience_Years_boxplot.png)

---

## Analysis for: Count_Time_Seconds

- **T-Test Results:**
    - T-Statistic: -1.785
    - P-Value: 0.0751
    - **Statistically Significant (p < 0.05): False**
- **Mean Values:**
    - Mean (Count_Time_Seconds) for Accurate Counts: 1074.93
    - Mean (Count_Time_Seconds) for Inaccurate Counts: 1341.66
    - Difference (Accurate - Inaccurate): -266.73

![Box plot for Count_Time_Seconds](plots\Count_Time_Seconds_boxplot.png)

---

## Summary Table

| variable               |   t_statistic |   p_value |   mean_accurate |   mean_inaccurate | significant   |
|:-----------------------|--------------:|----------:|----------------:|------------------:|:--------------|
| Actual_Quantity        |         1.049 |    0.2949 |         1692.1  |           1506.23 | False         |
| Staff_Experience_Years |         6.855 |    0      |            5.6  |              4.23 | True          |
| Count_Time_Seconds     |        -1.785 |    0.0751 |         1074.93 |           1341.66 | False         |