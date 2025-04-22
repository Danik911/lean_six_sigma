# Root Cause Analysis Report (Logistic Regression)

Analyzed dataset: `simplepharma_inventory_analysis_with_anomalies.csv`

This report uses logistic regression to identify factors significantly associated with inventory count accuracy (`Count_Accurate`).

## Logistic Regression Model Summary

```
                           Logit Regression Results                           
==============================================================================
Dep. Variable:         Count_Accurate   No. Observations:                 1000
Model:                          Logit   Df Residuals:                      990
Method:                           MLE   Df Model:                            9
Date:                Mon, 21 Apr 2025   Pseudo R-squ.:                 0.05253
Time:                        15:05:01   Log-Likelihood:                -524.30
converged:                       True   LL-Null:                       -553.37
Covariance Type:            nonrobust   LLR p-value:                 3.055e-09
===============================================================================================
                                  coef    std err          z      P>|z|      [0.025      0.975]
-----------------------------------------------------------------------------------------------
const                           1.5172      0.434      3.495      0.000       0.666       2.368
Staff_Experience_Years          0.0372      0.033      1.136      0.256      -0.027       0.101
Count_Method_Manual Count      -0.8181      0.263     -3.106      0.002      -1.334      -0.302
Count_Method_Scanner Count      0.1228      0.252      0.487      0.626      -0.371       0.617
Staff_Training_Basic           -0.8179      0.308     -2.657      0.008      -1.421      -0.214
Staff_Training_Intermediate    -0.3394      0.289     -1.176      0.240      -0.905       0.226
Staff_Role_Team Leader          0.4400      0.580      0.758      0.448      -0.697       1.577
Staff_Role_Warehouse Team      -0.0524      0.173     -0.302      0.763      -0.392       0.288
Time_of_Day_Evening            -0.0308      0.186     -0.166      0.868      -0.395       0.333
Time_of_Day_Morning             0.1178      0.187      0.630      0.529      -0.249       0.484
===============================================================================================
```


## Odds Ratios

Odds ratios indicate the change in odds of an accurate count for a one-unit change in the predictor.
- Odds Ratio > 1: Increased odds of accuracy.
- Odds Ratio < 1: Decreased odds of accuracy.
- CI includes 1: Effect is not statistically significant (at p=0.05).

|                             |   Odds Ratio |   Lower CI (2.5%) |   Upper CI (97.5%) |   p-value |
|:----------------------------|-------------:|------------------:|-------------------:|----------:|
| const                       |        4.559 |             1.947 |             10.674 |     0.000 |
| Staff_Role_Team Leader      |        1.553 |             0.498 |              4.841 |     0.448 |
| Count_Method_Scanner Count  |        1.131 |             0.690 |              1.853 |     0.626 |
| Time_of_Day_Morning         |        1.125 |             0.780 |              1.623 |     0.529 |
| Staff_Experience_Years      |        1.038 |             0.973 |              1.107 |     0.256 |
| Time_of_Day_Evening         |        0.970 |             0.674 |              1.395 |     0.868 |
| Staff_Role_Warehouse Team   |        0.949 |             0.675 |              1.333 |     0.763 |
| Staff_Training_Intermediate |        0.712 |             0.405 |              1.254 |     0.240 |
| Staff_Training_Basic        |        0.441 |             0.241 |              0.807 |     0.008 |
| Count_Method_Manual Count   |        0.441 |             0.263 |              0.739 |     0.002 |



## Odds Ratio Visualization

![Odds Ratio Plot](plots\odds_ratio_plot.png)

*Green bars indicate factors significantly associated with count accuracy (p < 0.05). Red dashed line indicates no effect.*
