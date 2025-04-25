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

## Identified Issues and Root Causes

Analysis of the inventory data reveals several critical issues affecting the stocktake process:

1. **Staff Training Deficiencies:** Staff with basic training have significantly lower accuracy rates (65.3%) compared to those with advanced training (87.3%), indicating a clear relationship between training level and count accuracy (p < 0.001).

2. **Counting Method Inefficiencies:** Manual counting shows substantially lower accuracy (62.2%) compared to scanner-based counting (85.1%), representing a 22.9 percentage point gap in performance (p < 0.001).

3. **Time-of-Day Impact:** Morning counts are more accurate than evening counts, with a statistically significant difference (p = 0.027), suggesting fatigue or time pressure affects accuracy.

4. **Staff Experience Gap:** Staff with more experience (average of 5.6 years) demonstrate higher accuracy compared to less experienced staff (average of 4.2 years), highlighting the importance of experience in inventory counting (p < 0.001).

## Process Bottlenecks

The stocktake process contains several bottlenecks that limit efficiency and accuracy:

1. **Scanner Availability Constraints:** Only six scanners are distributed among staff groups, limiting the use of the more accurate scanning method and forcing some groups to use less accurate manual counting.

2. **Data Upload Delays:** The process of having the sales manager upload data to the Omega ERP system creates a bottleneck, with staff waiting for this step to complete before proceeding.

3. **Verification and Recount Cycles:** When discrepancies are found, items must be recounted, creating additional bottlenecks and extending the total process time beyond the target takt time of 6 hours.

4. **Staff Allocation Issues:** Suboptimal distribution of skilled staff across counting zones leads to inefficient resource utilization, with team leaders (who demonstrate higher accuracy) not always assigned to the most critical counting areas.

## Waste Analysis (Lean Perspective)

The inventory process contains multiple forms of waste as defined by Lean principles:

### Motion Waste
- Unnecessary movement during counting process
- Placing sticky notes with counted quantities on shelves
- Movement between manual counting and scanning phases

### Waiting Waste
- Staff lunch break (1 hour)
- Waiting for data upload to Omega ERP (variable time)
- Waiting for scanner distribution and return

### Transportation Waste
- Moving between building areas (shop floor, storage, warehouse)
- Returning scanners to sales manager

### Defects Waste
- 23.5% overall error rate in counting
- 10.19% average magnitude of errors when they occur
- Recounting required for discrepancies

### Overprocessing Waste
- Double counting (manual and scanner)
- Placing sticky notes as a temporary record
- Multiple data entry points (paper to scanner to ERP)

### Inventory Waste
- Inaccurate counts leading to potential stockouts or excess inventory
- Extended process duration (7 hours vs. target 6 hours)

### Talent Waste
- Misalignment of staff skills and counting responsibilities
- Underutilization of advanced-trained staff

## Cost of Poor Quality (COPQ)

The current inventory process generates significant costs due to quality issues:

- **Revenue Loss:** €3,600 per stocktake due to closure during counting
- **Staff Overtime:** €720 per stocktake
- **Inventory Inaccuracy Cost:** €4,200 per quarter
- **Total Annual COPQ:** €34,080

## Improvement Opportunities

Data analysis suggests several opportunities for process improvement:

1. **Standardize on Scanner-Based Counting:** Given the 22.9 percentage point accuracy advantage, increasing scanner availability and standardizing on scanner counting could significantly improve accuracy.

2. **Training Program Enhancement:** The 21.8 percentage point gap between basic and advanced training indicates substantial ROI potential for enhanced training programs.

3. **Morning Scheduling:** Rescheduling stocktakes to morning hours could improve accuracy based on the statistically significant time-of-day effect.

4. **Process Redesign:** Eliminating non-value-added activities like sticky notes and multiple data entry points could reduce the current 50% non-value-added time.

5. **RFID Implementation:** As outlined in the project charter, RFID technology implementation could eliminate manual counting entirely, achieving the target 99% accuracy rate.

## Visualizations
Validation plots have been generated and saved:
- `data_validation_plots.png`
- `factor_relationship_validation.png`