# Initial Data Exploration Report

This report provides a basic overview and initial exploration of the SimplePharma inventory dataset.

## Basic Information
- **Dataset shape:** (1000, 28)

### Data Types
| Column                 | DataType   |
|:-----------------------|:-----------|
| Record_ID              | object     |
| Date                   | object     |
| Actual_Quantity        | int64      |
| Counted_Quantity       | int64      |
| Count_Accurate         | bool       |
| Error_Type             | object     |
| Error_Amount           | int64      |
| Error_Percentage       | float64    |
| Count_Time_Seconds     | int64      |
| Staff_ID               | int64      |
| Staff_Experience_Years | int64      |
| Staff_Training         | object     |
| Staff_Role             | object     |
| Product_Type           | object     |
| Product_Subtype        | object     |
| Packaging              | object     |
| Location               | object     |
| Time_of_Day            | object     |
| Day_of_Week            | object     |
| End_of_Month           | bool       |
| Scanner_Battery        | object     |
| Scanner_Model          | object     |
| Scanner_Calibrated     | bool       |
| ERP_Status             | object     |
| WiFi_Strength          | object     |
| Count_Method           | object     |
| Inventory_Review_Type  | object     |
| Location_Type          | object     |

## Summary Statistics (Numerical Variables)
|       |   Actual_Quantity |   Counted_Quantity |   Error_Amount |   Error_Percentage |   Count_Time_Seconds |   Staff_ID |   Staff_Experience_Years |
|:------|------------------:|-------------------:|---------------:|-------------------:|---------------------:|-----------:|-------------------------:|
| count |           1000    |            1000    |       1000     |         1000       |              1000    | 1000       |                 1000     |
| mean  |           1648.42 |            1630.52 |         31.281 |            2.39481 |              1137.62 |   10.879   |                    5.277 |
| std   |           2675.02 |            2655.6  |        134.83  |            6.03714 |              1949.39 |    5.84573 |                    3.162 |
| min   |              1    |               1    |          0     |            0       |                10    |    1       |                    1     |
| 25%   |             65    |              65    |          0     |            0       |                40.75 |    6       |                    3     |
| 50%   |            609.5  |             607    |          0     |            0       |               348    |   11       |                    4     |
| 75%   |           1826.25 |            1821    |          0     |            0       |              1302.25 |   16       |                    6     |
| max   |          16954    |           16954    |       1787     |          100       |             16220    |   20       |                   14     |

## Missing Values
Missing values per column:
| Column     |   Missing Count |
|:-----------|----------------:|
| Error_Type |             765 |

## Sample Data (First 5 Rows)
| Record_ID   | Date       |   Actual_Quantity |   Counted_Quantity | Count_Accurate   | Error_Type   |   Error_Amount |   Error_Percentage |   Count_Time_Seconds |   Staff_ID |   Staff_Experience_Years | Staff_Training   | Staff_Role     | Product_Type   | Product_Subtype   | Packaging    | Location                               | Time_of_Day   | Day_of_Week   | End_of_Month   | Scanner_Battery   | Scanner_Model   | Scanner_Calibrated   | ERP_Status   | WiFi_Strength   | Count_Method   | Inventory_Review_Type   | Location_Type   |
|:------------|:-----------|------------------:|-------------------:|:-----------------|:-------------|---------------:|-------------------:|---------------------:|-----------:|-------------------------:|:-----------------|:---------------|:---------------|:------------------|:-------------|:---------------------------------------|:--------------|:--------------|:---------------|:------------------|:----------------|:---------------------|:-------------|:----------------|:---------------|:------------------------|:----------------|
| REC0001     | 2023-03-03 |               322 |                270 | False            | Undercount   |             52 |            16.1491 |                   73 |          5 |                       14 | Advanced         | Pharmacy Staff | Drug           | Refrigerated      | Blister Pack | Storage Room - Drugs                   | Evening       | Monday        | False          | High              | Current Model   | True                 | Normal       | Normal          | Scanner Count  | Regular Stock Check     | Storage         |
| REC0002     | 2023-08-10 |              1276 |               1276 | True             | nan          |              0 |             0      |                  568 |          5 |                       14 | Advanced         | Pharmacy Staff | Medical Device | Diagnostic        | Box          | Shop Floor - Zone B                    | Morning       | Monday        | False          | Medium            | Old Model       | False                | Slow         | Normal          | Scanner Count  | Quarterly Stock-take    | Shop Floor      |
| REC0003     | 2023-12-14 |                41 |                 41 | True             | nan          |              0 |             0      |                   39 |          7 |                        3 | Advanced         | Pharmacy Staff | Miscellaneous  | Hygiene           | Individual   | Shop Floor - Zone B                    | Morning       | Saturday      | False          | Low               | Current Model   | True                 | Normal       | Normal          | Manual Count   | Ad-hoc Check            | Shop Floor      |
| REC0004     | 2023-02-21 |              1066 |               1066 | True             | nan          |              0 |             0      |                  512 |         12 |                        6 | Advanced         | Warehouse Team | Medical Device | Therapeutic       | Box          | Shop Floor - Zone A                    | Morning       | Tuesday       | False          | High              | Current Model   | True                 | Normal       | Normal          | Scanner Count  | Regular Stock Check     | Shop Floor      |
| REC0005     | 2023-07-03 |             14496 |              14496 | True             | nan          |              0 |             0      |                 7555 |         17 |                        3 | Intermediate     | Warehouse Team | Drug           | Refrigerated      | Bottle       | Warehouse - Shop Building Ground Floor | Afternoon     | Thursday      | False          | Low               | Current Model   | True                 | Normal       | Weak            | Scanner Count  | Quarterly Stock-take    | Warehouse       |

## Unique Values in Categorical Variables

### Count_Accurate
- **Unique Values:** `False, True`
- **Value Counts:**
| Count   |   count |
|:--------|--------:|
| True    |     765 |
| False   |     235 |

### Error_Type
- **Unique Values:** `Undercount, nan, Overcount`
- **Value Counts:**
| Count      |   count |
|:-----------|--------:|
| Undercount |     172 |
| Overcount  |      63 |

### Staff_Training
- **Unique Values:** `Advanced, Intermediate, Basic`
- **Value Counts:**
| Count        |   count |
|:-------------|--------:|
| Intermediate |     567 |
| Basic        |     236 |
| Advanced     |     197 |

### Staff_Role
- **Unique Values:** `Pharmacy Staff, Warehouse Team, Team Leader`
- **Value Counts:**
| Count          |   count |
|:---------------|--------:|
| Pharmacy Staff |     695 |
| Warehouse Team |     200 |
| Team Leader    |     105 |

### Product_Type
- **Unique Values:** `Drug, Medical Device, Miscellaneous`
- **Value Counts:**
| Count          |   count |
|:---------------|--------:|
| Drug           |     499 |
| Medical Device |     299 |
| Miscellaneous  |     202 |

### Location_Type
- **Unique Values:** `Storage, Shop Floor, Warehouse`
- **Value Counts:**
| Count      |   count |
|:-----------|--------:|
| Shop Floor |     519 |
| Storage    |     268 |
| Warehouse  |     213 |

### Count_Method
- **Unique Values:** `Scanner Count, Manual Count, Combined Method`
- **Value Counts:**
| Count           |   count |
|:----------------|--------:|
| Scanner Count   |     624 |
| Manual Count    |     283 |
| Combined Method |      93 |

### Scanner_Calibrated
- **Unique Values:** `True, False`
- **Value Counts:**
| Count   |   count |
|:--------|--------:|
| True    |     708 |
| False   |     292 |