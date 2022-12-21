# Libraries and Frameworks

## Numpy

Python library to work with numbers in arrays.

## Panda

Uses numpy, more data processing on larger data collections (dataframes).

## SciKit Learn
(sciPy Toolkit)

- dataset manipulation
- processing metrics
- built-in algos for ML
- functions such as classification,
- regression
- clustering
- mode
- modal selection

- these algos/models are called estimators.
-- can be fitted on some data 
-- then can predict new values
-- transformers and producers, transform method on data

- can be chained together to make Pipelines.
-- fit and predict
-- prevents data leakage (disclosing testing data into training data)


## Workflow

- Load/Clean/manipulate your data using Panda
- Translate Panda DataFrame into Numpy Array
- Feed it into Scikit Learn functions.

usually automated. So you see results from data in a nice workflow.

