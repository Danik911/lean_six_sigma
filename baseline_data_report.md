# Baseline Data Generation Report

This report summarizes the key metrics and validation results from the generated baseline inventory data.

## Overall Baseline Metrics
- **Overall Count Accuracy:** 76.50%
- **Average Error Percentage (when errors occur):** 10.19%
- **Average Count Time:** 1137.62 seconds

## Accuracy by Key Factors

### Accuracy by Staff Training
| Staff_Training   |   Count_Accurate |
|:-----------------|-----------------:|
| Advanced         |         0.873096 |
| Basic            |         0.652542 |
| Intermediate     |         0.77425  |

### Accuracy by Count Method
| Count_Method    |   Count_Accurate |
|:----------------|-----------------:|
| Combined Method |         0.623656 |
| Manual Count    |         0.621908 |
| Scanner Count   |         0.850962 |

### Accuracy by Location Type
| Location_Type   |   Count_Accurate |
|:----------------|-----------------:|
| Shop Floor      |         0.788054 |
| Storage         |         0.764925 |
| Warehouse       |         0.70892  |

## Visualizations
Validation plots have been generated and saved:
- `data_validation_plots.png`
- `factor_relationship_validation.png`